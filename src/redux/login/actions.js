import axios from 'axios';
import { AppConfig } from '@constants'

import {
  INITIATE_LOGIN,
  INITIATE_LOGIN_SUCCESS,
  INITIATE_LOGIN_FAILURE,
} from './constants'

export function initiateLogin() {
  return {
    type: INITIATE_LOGIN
  }
}

export function initiateLoginSuccess(data) {
  return {
    type: INITIATE_LOGIN_SUCCESS,
    data,
  }
}

export function initiateLoginFailure() {
  return {
    type: INITIATE_LOGIN_FAILURE
  }
}

export function onLogin() {
  return (dispatch) => {
    dispatch(initiateLogin())

    return axios.get(AppConfig.urls + 'people/')
      .then(function (response) {
        dispatch(initiateLoginSuccess(response.data))
        return response.data;
      })
      .catch(function (error) {
        dispatch(initiateLoginFailure());
        return error;
      });
  }
}