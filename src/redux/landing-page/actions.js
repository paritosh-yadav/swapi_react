import axios from 'axios';
import { AppConfig } from '@constants'

import {
  SEARCH_PLANET,
  SEARCH_PLANET_SUCCESS,
  SEARCH_PLANET_FAILURE,
} from './constants'

export function initiatePlanetSearch() {
  return {
    type: SEARCH_PLANET
  }
}

export function initiatePlanetSearchSuccess(data) {
  return {
    type: SEARCH_PLANET_SUCCESS,
    data,
  }
}

export function initiatePlanetSearchFailure() {
  return {
    type: SEARCH_PLANET_FAILURE
  }
}

export function searchPlanet(searchedTerm) {
  return (dispatch) => {
    dispatch(initiatePlanetSearch())
    return axios.get(AppConfig.urls + 'planets/',
      {
        params: {
          search: searchedTerm
        }
      }
    )
      .then(function (response) {
        dispatch(initiatePlanetSearchSuccess(response.data))
        return response.data;
      })
      .catch(function (error) {
        dispatch(initiatePlanetSearchFailure());
        return error;
      });
  }
}