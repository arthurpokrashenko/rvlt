import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { getRates } from '../api/rates';
import store from '../store';
import { calculateConversionRate, extractRates, formatMoney } from '../utils/money';
import { IRates, IStore } from './../store/IStore';
import { ECurrency, TCurrency } from './../types/currency';

export const CHANGE_SOURCE_CURRENCY = 'exchange/CHANGE_SOURCE_CURRENCY';
export const CHANGE_SOURCE_CURRENCY_SUCCESS = 'exchange/CHANGE_SOURCE_CURRENCY_SUCCESS';
export const CHANGE_SOURCE_CURRENCY_FAIL = 'exchange/CHANGE_SOURCE_CURRENCY_FAIL';
export const CHANGE_TARGET_CURRENCY = 'exchange/CHANGE_TARGET_CURRENCY';
export const CHANGE_TARGET_CURRENCY_SUCCESS = 'exchange/CHANGE_TARGET_CURRENCY_SUCCESS';
export const CHANGE_TARGET_CURRENCY_FAIL = 'exchange/CHANGE_TARGET_CURRENCY_FAIL';

export const CHANGE_SOURCE_AMOUNT = 'exchange/CHANGE_SOURCE_AMOUNT';
export const CHANGE_TARGET_AMOUNT = 'exchange/CHANGE_TARGET_AMOUNT';

export const EXCHANGE = 'exchange/EXCHANGE';
export const EXCHANGE_SUCCESS = 'exchange/EXCHANGE_SUCCESS';
export const EXCHANGE_FAIL = 'exchange/EXCHANGE_FAIL';

export interface IExchangeAction {
  type: 'exchange/EXCHANGE';
}

export interface IExchangeSuccessAction {
  type: 'exchange/EXCHANGE_SUCCESS';
  sourceCurrency: TCurrency;
  sourceAmount: number;
  targetCurrency: TCurrency;
  targetAmount: number;
}

export interface IExchangeFailAction {
  type: 'exchange/EXCHANGE_FAIL';
  error: 'NOT_ENOUGH_BALANCE' | 'OTHER';
}

export interface IChangeSourceCurrencyAction {
  type: 'exchange/CHANGE_SOURCE_CURRENCY';
}

export interface IChangeSourceCurrencySuccessAction {
  type: 'exchange/CHANGE_SOURCE_CURRENCY_SUCCESS';
  currency: TCurrency;
}

export interface IChangeSourceCurrencyFailAction {
  type: 'exchange/CHANGE_SOURCE_CURRENCY_FAIL';
}

export interface IChangeTargetCurrencyAction {
  type: 'exchange/CHANGE_TARGET_CURRENCY';
}

export interface IChangeTargetCurrencySuccessAction {
  type: 'exchange/CHANGE_TARGET_CURRENCY_SUCCESS';
  currency: TCurrency;
}

export interface IChangeTargetCurrencyFailAction {
  type: 'exchange/CHANGE_TARGET_CURRENCY_FAIL';
}

export interface IChangeSourceAmountAction {
  type: 'exchange/CHANGE_SOURCE_AMOUNT';
  value: number;
}

export interface IChangeTargetAmountAction {
  type: 'exchange/CHANGE_TARGET_AMOUNT';
  value: number;
}

export function changeSourceCurrency(currency: TCurrency) {
  return (dispatch: Dispatch<IStore>) => {
    dispatch({
      type: CHANGE_SOURCE_CURRENCY_SUCCESS,
      currency,
    });
    dispatch(changeTargetAmount());
  };
}

export function changeTargetCurrency(currency: TCurrency) {
  return (dispatch: Dispatch<IStore>) => {
    dispatch({
      type: CHANGE_TARGET_CURRENCY_SUCCESS,
      currency,
    });
    dispatch(changeTargetAmount());
  };
}

export function changeSourceAmount(value: number) {
  return (dispatch: Dispatch<IStore>) => {
    dispatch({
      type: CHANGE_SOURCE_AMOUNT,
      value,
    });
    dispatch(changeTargetAmount({ baseSourceAmount: value }));
  };
}

export function changeTargetAmount(options?: {baseSourceAmount?: number, baseRates?: {[key in ECurrency]: number}}) {
  const state = (store.getState() as IStore);
  const { sourceCurrency, targetCurrency, sourceAmount } = state.exchange;
  const conversionRate = calculateConversionRate({
    sourceCurrency,
    targetCurrency,
    rates: options && options.baseRates ? options.baseRates : extractRates(state.rates),
    baseCurrency: state.rates.base,
  });
  const amount = options && options.baseSourceAmount ? options.baseSourceAmount : sourceAmount;
  const targetAmount = Math.round(conversionRate * amount * 100) / 100;

  return (dispatch: Dispatch<IStore>) => {
    dispatch({
      type: CHANGE_TARGET_AMOUNT,
      value: targetAmount || null,
    });
  };
}

export function exchange() {
  const state = (store.getState() as IStore);
  const { sourceCurrency, targetCurrency, sourceAmount, targetAmount } = state.exchange;
  const { balance } = state;

  return (dispatch: Dispatch<IStore>) => {
    dispatch({
      type: EXCHANGE,
    });

    if ((balance[sourceCurrency] - sourceAmount) < 0) {
      dispatch({
        type: EXCHANGE_FAIL,
        error: 'NOT_ENOUGH_BALANCE',
      });
      toast.warn(`Unfortunately, there is not enough money on your ${sourceCurrency} balance`);
    } else {
      dispatch({
        type: EXCHANGE_SUCCESS,
        sourceCurrency,
        sourceAmount,
        targetCurrency,
        targetAmount,
      });
      toast.success(`
You\'ve successfully exchanged \
${formatMoney(sourceAmount, sourceCurrency)} for ${formatMoney(targetAmount, targetCurrency)}`);
    }
  };
}
