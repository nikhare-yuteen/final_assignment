import { combineReducers } from 'redux';
import reducerEvent from './event-reducer';
import CurrentDate from './event-reducer';

const allReducers = combineReducers({
  events: reducerEvent
})

export default allReducers