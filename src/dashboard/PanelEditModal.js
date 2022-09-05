import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

import {useFormik} from "formik";
import * as Yup from 'yup';
import {availablePanels} from "./AvailablePanels";

// ToDo: implement a configuration mode. If Configuration mode is enabled users should be able to:
// -- add new Panels
// -- remove panels
// -- configure panels (clicking on the cogwheel => display panel configuration popup)
// -- depending one model, users should be able to select the proper key to display, f.e on valueModel users should be able to select count or value -> this will be saved in 'select' key, see below
// -- if forecast, users should additionally be able to select, if they want to see 'current' or 'currentForecast',
// -- configuration dialog should have fields for
// -- -- 'label', simple text
// -- -- 'width' => 1,2 or 3
// -- -- 'format' => format can be 'plain', 'percent' or 'currency'

 const SimpleInput = (props) => {
    const {formik,field,as,children,onChange} = props;
    
        return <>
            <Form.Control
                as={as}
                name={field}
                onChange={onChange ? onChange : formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field]}
                className={formik.touched[field] && formik.errors[field] ? 'is-invalid' : null}
            >
                {children}
            </Form.Control>
            {formik.touched[field] && formik.errors[field] && <div
                className="invalid-feedback">{formik.touched[field] && formik.errors[field]}</div>}
        </>;
}

export const PanelEditModal = (props) => {
    const {panel,show, onClose, onSave} = props;
    const [panelMeta,setPanelMeta] = useState({});
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            source: panel?.source || '',
            model: panel?.model || 'value',
            format: panel?.format || '',
            width: panel?.width || 1,
            label: panel?.label || '',
            select: panel?.select || '',
            forecast: panel?.forecast || false,
            submit: null
        },
        validationSchema: Yup.object().shape({
            source: Yup.string().oneOf(availablePanels.map(p => p.key)).required('Bitte Datenquelle angeben'),
            label: Yup.string().max(255).required('Bitte Beschriftung angeben'),
            select: Yup.string().required('Bitte Datenpunkt angeben'),
            format: Yup.string().oneOf(['plain','currency','percent']).required('Bitte Zahlenformat angeben'),
        }),
        onSubmit: (values,{resetForm}) => {
            onSave({key: panel.key, ...values});
            resetForm()
        }
    });

    useEffect(() => {
        if(panel)
        {
            const selectedPanel = availablePanels.find(p => p.key === panel.source);
            setPanelMeta(selectedPanel)
        }

        formik.setValues({
            source: panel?.source || '',
            model: panel?.model || 'value',
            format: panel?.format || '',
            width: panel?.width || 1,
            label: panel?.label || '',
            select: panel?.select || '',
            forecast: panel?.forecast || false
        })
    }, [panel]);


    const handleClose = () => {
        formik.resetForm()
        onClose()
    }

    const handleSave = () => {
        formik.submitForm()
    }

    const changeSource = (e) => {
        console.log('source changed')
        const selectedPanel = availablePanels.find(p => p.key === e.target.value);
        setPanelMeta(selectedPanel)
        console.log(selectedPanel)
        formik.setFieldValue('source', e.target.value)
        formik.setFieldValue('model',selectedPanel?.model || 'value')
        formik.setFieldValue('format','')
        formik.setFieldValue('select','')
        formik.setFieldValue('forecast',false)
    }

    return (<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Panel bearbeiten</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group as={Row} controlId="source">
                <Form.Label column sm={4}>
                    Datenquelle
                </Form.Label>
                <Col sm={8} className={'px-0'}>
                    <SimpleInput
                        formik={formik}
                        field="source"
                        as="select"
                        onChange={changeSource}
                    >
                        <option value="" disabled>Bitte Datenquelle wählen</option>
                        {availablePanels.map(p => (<option key={p.key} value={p.key}>{p.name}</option>)
                        )}
                    </SimpleInput>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="label">
                <Form.Label column sm={4}>
                    Beschriftung
                </Form.Label>
                <Col sm={8} className={'px-0'}>
                    <SimpleInput
                        formik={formik}
                        field="label"
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="width">
                <Form.Label column sm={4}>
                    Größe
                </Form.Label>
                <Col sm={8} className={'px-0'}>
                    <SimpleInput 
                        formik={formik} 
                        field="width"
                        as="select"
                    >
                        <option value="" disabled>Bitte Breite wählen</option>
                        <option value="1">einfach</option>
                        <option value="2">doppelt</option>
                    </SimpleInput>
                </Col>
            </Form.Group>

            {panelMeta?.options && <Form.Group as={Row} controlId="select">
                <Form.Label column sm={4}>
                    Datenpunkt
                </Form.Label>
                <Col sm={8} className={'px-0'}>
                    <SimpleInput
                        formik={formik}
                        field="select"
                        as="select"
                    >
                        <option value="" disabled>Bitte Datenpunkt wählen</option>
                        {Object.keys(panelMeta?.options).map(key => <option key={key} value={key}>{panelMeta?.options[key]}</option>)}
                    </SimpleInput>
                </Col>
            </Form.Group>}

            <Form.Group as={Row} controlId="format">
                <Form.Label column sm={4}>
                    Zahlenformat
                </Form.Label>
                <Col sm={8} className={'px-0'}>
                    <SimpleInput
                        formik={formik}
                        field="format"
                        as="select"
                    >
                        <option value="" disabled>Bitte Format wählen</option>
                        <option value="plain">einfache Zahl</option>
                        <option value="currency">Währung</option>
                        <option value="percent">Prozent</option>
                    </SimpleInput>
                </Col>
            </Form.Group>

            {panelMeta?.forecast && <Form.Group as={Row} controlId="forecast">
                <Form.Label column sm={4}>
                    Prognose anzeigen
                </Form.Label>
                <Col sm={8} className={'px-0'}>
                    <label className="custom-switch px-0 py-1">
                        <input type="checkbox"
                               name="forecast"
                               className="custom-switch-input"
                               onBlur={formik.handleBlur}
                               checked={formik.values.forecast}
                               onChange={e => formik.setFieldValue('forecast', e.target.checked)}
                        />
                            <span className="custom-switch-indicator"></span>
                    </label>
                </Col>
            </Form.Group>}

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Schließen
            </Button>
            <Button variant="primary" onClick={handleSave}>
                Speichern
            </Button>
        </Modal.Footer>
    </Modal>
)
}