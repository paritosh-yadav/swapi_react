/**
 * Store Configuration
 */
import { createStore, applyMiddleware } from 'redux'
import app from './index'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';

export default function configureStore() {
  let store = createStore(app, applyMiddleware(thunk, createLogger()))
  return store
}