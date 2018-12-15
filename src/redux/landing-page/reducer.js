import {  
  SEARCH_PLANET,
  SEARCH_PLANET_SUCCESS,
  SEARCH_PLANET_FAILURE,
} from './constants'

const initialState = {
  searchedPlanet: null,
  isFetching: false,
  error: false
}

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PLANET:
      return {
        ...state,
        searchedPlanet: null,
        isFetching: true
      }
    case SEARCH_PLANET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        searchedPlanet: action.data
      }
    case SEARCH_PLANET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}