import {
  IChangeSourceAmountAction,
  IChangeSourceCurrencyAction,
  IChangeSourceCurrencyFailAction,
  IChangeSourceCurrencySuccessAction,
  IChangeTargetAmountAction,
  IChangeTargetCurrencyAction,
  IChangeTargetCurrencyFailAction,
  IChangeTargetCurrencySuccessAction,
  IExchangeAction,
  IExchangeFailAction,
  IExchangeSuccessAction,
} from './../actions/exchange';
import {
  IUpdateRatesAction,
  IUpdateRatesFailAction,
  IUpdateRatesSuccessAction,
} from './../actions/rates';

export type TAction = IUpdateRatesAction |
  IUpdateRatesSuccessAction |
  IUpdateRatesFailAction |
  IChangeSourceCurrencyAction |
  IChangeSourceCurrencyFailAction |
  IChangeSourceCurrencySuccessAction |
  IChangeTargetCurrencyAction |
  IChangeTargetCurrencyFailAction |
  IChangeTargetCurrencySuccessAction |
  IChangeSourceAmountAction |
  IChangeTargetAmountAction |
  IExchangeAction |
  IExchangeFailAction |
  IExchangeSuccessAction;
