import {  
  INITIATE_LOGIN,
  INITIATE_LOGIN_SUCCESS,
  INITIATE_LOGIN_FAILURE,
} from './constants'

const initialState = {
  peopleList: null,
  isFetching: false,
  error: false
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case INITIATE_LOGIN:
      return {
        ...state,
        peopleList: null,
        isFetching: true
      }
    case INITIATE_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        peopleList: action.data
      }
    case INITIATE_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}