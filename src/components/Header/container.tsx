import React from 'react';

import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { exchange } from '../../actions/exchange';
import { IStore } from '../../store/IStore';
import Header from './index';

export default connect(
  (state: IStore) => ({
    sourceCurrency: state.exchange.sourceCurrency,
    targetCurrency: state.exchange.targetCurrency,
    rates: state.rates,
    isExchangeAllowed: state.exchange.sourceAmount > 0,
  }),
  (dispatch: Dispatch<IStore>) => ({
    onExchange: () => dispatch(exchange()),
  }),
)(Header);
