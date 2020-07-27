import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TrelloCard from './TrelloCard'
import TrelloActionButton from './TrelloActionButton'
import styled from 'styled-components'

// styles
const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  height: 100%;
  padding: 8px;
  margin-right: 8px;
`

const TrelloList = ({ title, cards, listID, index }) => {
  return (
    // everything inside of Droppable uses render props
    <Draggable draggableId={String(listID)} index={index}>
      {provided => (
        <ListContainer 
          {...provided.draggableProps} 
          ref={provided.innerRef} 
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listID)}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h4 style={{fontFamily: "Roboto"}}>{title}</h4>
                {cards.map((card, index) => (
                  <TrelloCard 
                    index={index} 
                    key={card.id} 
                    text={card.text} 
                    id={card.id} 
                  />
                ))}
                {provided.placeholder}
                <TrelloActionButton listID={listID} />
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
    
  )
}

export default TrelloList
