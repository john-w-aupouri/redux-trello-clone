import { CONSTANTS } from '../actions'

let listID = 4
let cardID = 14

const initialState = [
  {
    title: 'Todos',
    id: `list-${0}`,
    cards: [
      // {
      //   id: `card-${0}`,
      //   text: "this project - style 3 dots drop down menu"
      // },
      // {
      //   id: `card-${1}`,
      //   text: "this project - make cards editable"
      // },
      // {
      //   id: `card-${2}`,
      //   text: "this project - make list title editable"
      // },
      // {
      //   id: `card-${3}`,
      //   text: "portfolio - implement page transtions"
      // },
      // {
      //   id: `card-${4}`,
      //   text: "portfolio - stlying, ensure is responsive"
      // },
      // {
      //   id: `card-${5}`,
      //   text: "my-blog - deploy via heroku"
      // }
    ]
  },
  {
    title: 'In Progress',
    id: `list-${1}`,
    cards: [
      // {
      //   id: `card-${6}`,
      //   text: "Becoming a MEAN-Stack Developer Learning Path"
      // },
      // {
      //   id: `card-${7}`,
      //   text: "Becoming a Web Developer Learning Path"
      // },
      // {
      //   id: `card-${8}`,
      //   text: "my-blog - styling"
      // }  
    ]
  },
  {
    title: 'Completed',
    id: `list-${2}`,
    cards: [
      // {
      //   id: `card-${9}`,
      //   text: "portolio - contact form emailjs"
      // },
      // {
      //   id: `card-${10}`,
      //   text: "my-blog - connect front and back ends"
      // },
      // {
      //   id: `card-${11}`,
      //   text: "Become a NodeJS Developer Learning Path"
      // },
      // {
      //   id: `card-${12}`,
      //   text: "Become a React Devloper Learning Path"
      // },
      // {
      //   id: `card-${13}`,
      //   text: "Become a MERN-Stack Devloper Learning Path"
      // },
    ]
  }
]

// reducers a funtion that take in an action producing a new state
const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    // add new list
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        id: `list-${listID}`,
        cards: [],
      }
      listID += 1
      return [...state, newList]
    
    // add new card
    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`
      }
      cardID += 1

      const newState = state.map(list => {
        if(list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          }
        } else {
          return list
        }
      })

      return newState
    }
    
    // for dragging
    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type
      } = action.payload

      // clone state
      const newState = [...state]

      // dragging lists around
      if(type === "list") {
        const list = newState.splice(droppableIndexStart, 1)
        newState.splice(droppableIndexEnd, 0, ...list)
        return newState
      }

      // in the same list
      if(droppableIdStart === droppableIdEnd) {
        const list = state.find(list => droppableIdStart === list.id)
        // get card where drag happened
        const card = list.cards.splice(droppableIndexStart, 1)
        list.cards.splice(droppableIndexEnd, 0, ...card)
      }

      // other list
      if(droppableIdStart !== droppableIdEnd) {
        // find the list where drag happened
        const listStart = state.find(list => droppableIdStart === list.id)

        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1)

        // find the list where drag ended
        const listEnd = state.find(list => droppableIdEnd === list.id)

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card)
      }

      return newState

    default:
      return state;
  }
}

export default listsReducer
