import { TAction } from '../types/actions';
import { ECurrency } from '../types/currency';

const initialState = {
  base: ECurrency.USD,
};

export default (state = initialState, action: TAction) => {
  switch (action.type) {
    case 'rates/UPDATE_RATES_SUCCESS':
      return {
        ...state,
        ...action.rates,
      };
    default:
      return state;
  }
};
