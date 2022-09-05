import React, {forwardRef, useEffect, useState} from "react";
import {getPanelData} from "../../api/dashboard";


export const Panel = forwardRef((props,ref) => {
    const {panel, edit,onEdit,onDelete,provided,...other} = props;
    const [panelState, setPanelState] = useState({
        loading: true,
        error: false,
        data: []
    })

    const {key, source, format, label, model, select, width, forecast } = panel;


    const reloadPanel = () => {
        getPanelData(source)
            .then(data => {
                setPanelState({
                    loading: false,
                    error: false,
                    data: data
                })
            })
    };

    useEffect(() => {
            reloadPanel();
        }
    ,[])

    useEffect(() => {
            reloadPanel();
        }
        ,[panel])

    const getValue = () => {
        let value = 0;

        if(forecast)
        {
            value =  panelState.data.currentForecast[select]
        }
        else
        {
            value =  panelState.data.current[select]
        }

        // if ('ratio-and-value' === type) return panelState.data.current.countRatio.toLocaleString('de-DE', {style: 'percent', minimumFractionDigits: 2});
        // if ('value' === type) return panelState.data.current.value;

        if('currency' === format) value = (value/100).toLocaleString('de-DE', {style: 'currency', currency: 'EUR'});
        if('percent' === format) value = value.toLocaleString('de-DE', {style: 'percent', minimumFractionDigits: 2});

        return value;
        // panelState.data.current.countRatio.toLocaleString('de-DE', {style: 'percent', minimumFractionDigits: 2})
    }

    const renderLoading = () => {
        if(!panelState.loading) return null;

        return (
        <div className="dimmer active">
            <div className="loader" />
            <div className="dimmer-content" style={{minHeight: '75px'}} />
        </div>
        );

    }

    const renderHeadline = () => {
        if(panelState.loading || panelState.error) return null;

        return (
            <div className="text-right text-green">
                {/*{12.toLocaleString('de-DE', {style: 'percent', minimumFractionDigits: 2})} <i className="fe fe-chevron-up" />*/}
                22,48% <i className="fe fe-chevron-up" />
            </div>
        );

    }

    const renderEditHeader = () => {
        if(!edit) return null;

        return (
            <div className="card-header p-1" style={{minHeight: "1em"}}>
                <div className="btn btn-xs" {...provided.dragHandleProps} style={{cursor: "move"}}><i className="fe fe-move" /></div>
                <div className="card-options mr-0">
                    <button type="button" className="btn btn-secondary btn-xs mx-1" onClick={() => onEdit(key)}><i className="fe fe-settings" /></button>
                    <button type="button" className="btn btn-danger btn-xs"><i className="fe fe-x" /></button>
                </div>
            </div>
        )
    }

    const renderContent = () => {
        if(panelState.loading || panelState.error) return null;

        return (
            <>
                <div className="h1 m-0">{getValue()}</div>
                <div className="text-muted mb-4">{label}</div>
            </>
        );

    }




    return (
        <div ref={ref} className={`col-6 col-sm-3 col-lg-${width ? width : 1}`} {...other}>
            <div className="card">
                {renderEditHeader()}
                <div className="card-body p-3 text-center">
                    {renderLoading()}
                    {renderHeadline()}
                    {renderContent()}
                </div>
            </div>
        </div>
    )
})