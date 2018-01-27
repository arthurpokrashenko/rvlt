import React from 'react';

import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { changeSourceAmount, changeSourceCurrency, changeTargetCurrency } from '../../actions/exchange';
import { updateRates } from '../../actions/rates';
import { IStore } from '../../store/IStore';
import { TCurrency } from '../../types/currency';
import { extractRates } from '../../utils/money';
import Exchange from './index';

export default connect(
  (state: IStore) => ({
    balance: state.balance,
    sourceCurrency: state.exchange.sourceCurrency,
    targetCurrency: state.exchange.targetCurrency,
    sourceAmount: state.exchange.sourceAmount,
    targetAmount: state.exchange.targetAmount,
    rates: extractRates(state.rates),
    rateBase: state.rates.base,
  }),
  (dispatch: Dispatch<IStore>) => ({
    updateRates: () => dispatch(updateRates()),
    onChangeSourceCurrency: (currency: TCurrency) => dispatch(changeSourceCurrency(currency)),
    onChangeTargetCurrency: (currency: TCurrency) => dispatch(changeTargetCurrency(currency)),
    onChangeSourceAmount: (value: number) => dispatch(changeSourceAmount(value)),
  }),
)(Exchange);
