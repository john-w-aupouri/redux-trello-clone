import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import TrelloList from './components/TrelloList'
import TrelloActionButton from './components/TrelloActionButton'
import { sort } from './actions'
import styled from 'styled-components'

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`

class App extends Component {

  // fires when anything draggable is engaged
  onDragEnd = (result) => {
    // destination and source house props droppableId and index
    const { destination, source, draggableId, type } = result

    // check if there is a destination
    if(!destination) {
      return
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    )
  }

  render() {
    const { lists } = this.props

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h2 style={{fontFamily: "Roboto"}}>Redux Trello Clone</h2>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
              {lists.map((list, index) => (
                <TrelloList 
                  listID={list.id} 
                  key={list.id} 
                  title={list.title} 
                  cards={list.cards} 
                  index={index}
                />
              ))} 
              {provided.placeholder}
              <TrelloActionButton list /> 
            </ListContainer>
          )}
        </Droppable>
        
      </DragDropContext>
    )
  } 
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App) 
