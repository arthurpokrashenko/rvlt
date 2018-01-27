import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import balanceReducer from './balance';
import exchangeReducer from './exchange';
import ratesReducer from './rates';

export default combineReducers({
  routing: routerReducer,
  balance: balanceReducer,
  exchange: exchangeReducer,
  rates: ratesReducer,
});
