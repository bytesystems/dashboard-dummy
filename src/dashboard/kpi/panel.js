import React, {useEffect, useState} from "react";
import {getPanelData} from "../../api/dashboard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChevronDown,faChevronUp,faCog } from '@fortawesome/free-solid-svg-icons'


export const Panel = (props) => {

    const {panel,model,format,select,forecast,width,label} = props;

    const [panelState, setPanelState] = useState({
        loading: true,
        error: false,
        data: []
    })


    useEffect(() => {
            getPanelData(panel)
                .then(data=>{
                    setPanelState({
                        loading: false,
                        error: false,
                        data: data
                    })
                })
        }
    ,[panel])

    const getValue = () => {
        let value = 0;

        if(forecast)
        {
            if ('valueModel' === model) value =  panelState.data.currentForecast[select]
        }
        else
        {
            if ('valueModel' === model) value =  panelState.data.current[select]
        }

        // if ('ratio-and-value' === type) return panelState.data.current.countRatio.toLocaleString('de-DE', {style: 'percent', minimumFractionDigits: 2});
        // if ('value' === type) return panelState.data.current.value;

        if('currency' === format) value = (value/100).toLocaleString('de-DE', {style: 'currency', currency: 'EUR'});
        if('percent' === format) value = value.toLocaleString('de-DE', {style: 'percent', minimumFractionDigits: 2});

        return value;
        // panelState.data.current.countRatio.toLocaleString('de-DE', {style: 'percent', minimumFractionDigits: 2})
    }

    // TODO: display the cogwheel only, if edit mode of dashboard is enabled

    return (
        <div className={`col-${width ? width : 1}`}>
            <div className="card">
                <div className="card-header">
                    <FontAwesomeIcon icon={faCog} />
                </div>
                <div className="card-body p-3 text-center">

                    {panelState.loading && (
                        <div className="dimmer active">
                            <div className="loader" />
                            <div className="dimmer-content" style={{minHeight: '75px'}} />
                        </div>
                    )}
                    {!panelState.loading && !panelState.error && (<>
                        <div className="text-right text-green">
                            22,48% <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                        <div className="h4 m-0">{getValue()}</div>
                        <div className="text-muted mb-4">{label}</div>
                    </>)}
                </div>
            </div>
        </div>
    )
}