import React from 'react';
import {Draggable} from "react-beautiful-dnd";
import {Panel} from "./panel";


export const DraggableWidget = ({ panel, index, edit, onEdit, onDelete }) => (
    <Draggable draggableId={panel.key} index={index} isDragDisabled={!edit}>
        {provided => (
                <Panel
                    ref={provided.innerRef}
                    edit={edit}
                    onEdit={onEdit}
                    onDelete={onDelete} // Prop chaining
                    {...provided.draggableProps}
                    provided={provided}
                    panel={panel}

                       />
        )}
    </Draggable>
);