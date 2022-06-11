import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Panel} from "./panel";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function DraggablePanel({ panel, index }) {
  return (
    <Draggable draggableId={panel.key} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Panel {...panel}/>
        </div>
      )}
    </Draggable>
  );
}

const PanelList = React.memo(function PanelList({ panels }) {
  return panels.map((panel, index) => (
    <DraggablePanel panel={panel} index={index} key={panel.key} />
  ));
});

function DnDList({ panels }) {
  const [state, setState] = useState({ panels: panels });

  function onDragEnd(result) {
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
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" direction="horizontal">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} className='d-flex'>
            <div className="row">
              <PanelList panels={state.panels} />
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DnDList;
