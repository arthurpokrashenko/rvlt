import { TAction } from './../types/actions';
import { ECurrency } from './../types/currency';

const initialState: {[key in ECurrency]: number} = {
  [ECurrency.USD]: 750.12,
  [ECurrency.EUR]: 27,
  [ECurrency.GBP]: 1503.25,
};

export default (state = initialState, action: TAction) => {
  switch (action.type) {
    case 'exchange/EXCHANGE_SUCCESS':
      return {
        ...state,
        [action.sourceCurrency]: state[action.sourceCurrency] - action.sourceAmount,
        [action.targetCurrency]: state[action.targetCurrency] + action.targetAmount,
      };

    default:
      return state;
  }
};
