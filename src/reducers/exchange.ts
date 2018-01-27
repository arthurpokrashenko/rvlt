import { TAction } from './../types/actions';

const initialState = {
  sourceCurrency: 'GBP',
  targetCurrency: 'USD',
  sourceAmount: null,
  targetAmount: null,
};

export default (state = initialState, action: TAction) => {
  switch (action.type) {
    case 'exchange/CHANGE_SOURCE_CURRENCY_SUCCESS':
      return {
        ...state,
        sourceCurrency: action.currency,
      };

    case 'exchange/CHANGE_TARGET_CURRENCY_SUCCESS':
      return {
        ...state,
        targetCurrency: action.currency,
      };

    case 'exchange/CHANGE_SOURCE_AMOUNT':
      return {
        ...state,
        sourceAmount: action.value,
      };

    case 'exchange/CHANGE_TARGET_AMOUNT':
      return {
        ...state,
        targetAmount: action.value,
      };

    case 'exchange/EXCHANGE_SUCCESS':
      return {
        ...state,
        sourceAmount: null,
        targetAmount: null,
      };

    default:
      return state;
  }
};
