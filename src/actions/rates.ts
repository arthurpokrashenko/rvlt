import { Dispatch } from 'redux';
import { getRates } from '../api/rates';
import { IStore } from './../store/IStore';
import { ECurrency } from './../types/currency';
import { changeTargetAmount } from './exchange';

export const UPDATE_RATES = 'rates/UPDATE_RATES';
export const UPDATE_RATES_SUCCESS = 'rates/UPDATE_RATES_SUCCESS';
export const UPDATE_RATES_FAIL = 'rates/UPDATE_RATES_FAIL';

export interface IUpdateRatesAction {
  type: 'rates/UPDATE_RATES';
}

export interface IUpdateRatesSuccessAction {
  type: 'rates/UPDATE_RATES_SUCCESS';
  rates: {[key in ECurrency]: number};
}

export interface IUpdateRatesFailAction {
  type: 'rates/UPDATE_RATES_FAIL';
}

export function updateRates() {
  return (dispatch: Dispatch<IStore>) => {
    dispatch({ type: UPDATE_RATES });

    getRates()
      .then(rates => {
        dispatch({
          type: UPDATE_RATES_SUCCESS,
          rates,
        });
        dispatch(changeTargetAmount({
          baseRates: rates,
        }));
      });
  };
}
