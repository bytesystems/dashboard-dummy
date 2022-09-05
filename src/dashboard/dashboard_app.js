import React from 'react';
import {useEffect,useState,useRef} from "react";
import {Panel} from "./widgets/panel";
import {DraggableWidget} from "./widgets/DraggableWidget";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {PanelEditModal} from "./PanelEditModal";
import { v4 as uuidv4 } from 'uuid';
import alertify from "alertifyjs";
import OutsideAlerter from "./OutsideAlerter";
import {savePanels} from "../api/dashboard";

const PanelList = React.memo(function PanelList({ panels, edit, onEdit,onDelete }) {

    return panels.map((panel, index) => (
        <DraggableWidget panel={panel} index={index} key={panel.key} edit={edit} onEdit={onEdit} onDelete={onDelete} />
    ));
});

function WrappedDashboardApp(props) {
    // console.log(props);
    const { panels,user, edit } = props;
    const [state, setState] = useState({ panels: panels === null ? [] : panels});
    const [show, setShow] = useState(false);
    const [panel, setPanel] = useState(null)

    const handleClose = () => setShow(false);
    const handleNew = () => {
        setPanel({
            key: uuidv4()
        });
        setShow(true);
    }

    const handleEdit = (key) => {
        setPanel(state.panels.find(p => p.key === key))
        setShow(true);
    }

    const handleDelete = () => {
        //ToDo: implement this method
    }

    const handleSave = (panel) => {
        setShow(false);
        const panelIdx = state.panels.findIndex(obj => obj.key === panel.key);
        const updatedPanels = panelIdx < 0 ? [...state.panels,{...panel}] : [...state.panels.slice(0, panelIdx), panel, ...state.panels.slice(panelIdx + 1)]
        setState({ panels: updatedPanels });
        savePanels(updatedPanels).then(
            alertify.success('Dashboard aktualisiert.')
        );
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = result => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const panels = reorder(
            state.panels,
            result.source.index,
            result.destination.index
        );

        setState({ panels });


        savePanels(panels).then(
            alertify.success('Dashboard aktualisiert.')
        );
    };

    const renderNewCard = () => {
        if (!edit) return null;

        return (
            <div className="col-1">
            <div className="card" style={{
                border: "1px dashed #777",
                background: "transparent",
                position: "relative",
                paddingTop: "100%",
            }}
            onClick={handleNew}
            >
                <div style={{
                    position: "absolute",
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span className="avatar avatar-icon" style={{
                        backgroundColor: 'rgb(49 80 119 / 60%)',
                        color: '#fff',
                        width: '5rem',
                        height: '5rem',
                        lineHeight: '5.8rem'
                    }}>
                        <i className="fe fe-plus" style={{ fontSize: '250%' }}/>
                    </span>
                </div>
            </div>
        </div>)
    }



    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list" direction="horizontal">
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="row row-cards row-deck gutters-xs" >
                            <PanelList panels={state.panels} edit={edit} onEdit={handleEdit} onDelete={handleDelete}/>
                            {provided.placeholder}
                            {renderNewCard()}
                            <PanelEditModal panel={panel} show={show} onClose={handleClose} onSave={handleSave}/>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {/*{panels.map((p) => <Panel {...p} edit={edit} />)}*/}
            {/*{renderToggle()}*/}
        </>

    );
}

export function DashboardApp(props) {
    const [edit, setEdit] = useState(false);

    const handleClickOutside = (event) => {
        if(event.target.id === 'dashboard-app-config')
        {
            setEdit(state => !state)
        }
    }

    return (
        <OutsideAlerter onClick={handleClickOutside}>
            <WrappedDashboardApp panels={[]} edit={edit}/>
        </OutsideAlerter>
    )
}