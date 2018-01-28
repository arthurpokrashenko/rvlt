import React, { Component, CSSProperties } from 'react';
import AutosizeInput from 'react-input-autosize';
import { TCurrency } from '../../types/currency';
import { formatMoney } from '../../utils/money';
import { mergeStyles } from '../../utils/style';
import When from '../When';

const style = require('./style.css');

export interface ICurrencyPlateProps {
  currency: TCurrency;
  balance: number;
  amount: number;
  isSource?: boolean;
  containerStyle?: CSSProperties;
  rate?: string;
  isSelected?: boolean;
  onChange?: (value: number | null) => void;
}

export interface ICurrentcyPlateState {
  amountValue?: number;
}

export default class CurrencyPlate extends Component<ICurrencyPlateProps, ICurrentcyPlateState> {
  private amountInput: HTMLInputElement | null;

  public constructor(props: ICurrencyPlateProps) {
    super(props);

    this.state = {
      amountValue: undefined,
    };
  }

  public render() {
    const { currency, isSource, amount, containerStyle } = this.props;
    const isAmountExists = Math.abs(amount) > 0;

    return (
      <div {...mergeStyles(style.container, containerStyle)} onClick={() => this.handlePlateClicked()}>
        <div className={style.exchange}>
          <div className={style.currencyTitle}>
            {currency}
            {this.renderBalance()}
          </div>
          <div {...mergeStyles(style.amount, style.amountNegative)}>
            {isAmountExists &&
              <div className={style.sign}>{isSource ? '–' : '+'}</div>
            }
            {isSource &&
              <AutosizeInput
                inputRef={(input: HTMLInputElement) => this.amountInput = input}
                type="number"
                value={amount || ''}
                onChange={(event: React.FormEvent<HTMLInputElement>) => this.handleAmountChanged(event)}
              />
            }
            {!isSource &&
              <div className={style.amountPresenter}>{amount}</div>
            }
            {this.renderRate()}
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    setTimeout(() => {
      if (this.props.isSelected && this.amountInput) {
        this.amountInput.focus();
      }
    }, 0);
  }

  public componentWillReceiveProps(nextProps: ICurrencyPlateProps) {
    if (!this.props.isSelected && nextProps.isSelected && this.amountInput) {
      this.amountInput.focus();
    }
  }

  private handleAmountChanged(event: React.FormEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    const inputValue = value === '0' || !value ? null : Number(value);

    if (this.props.onChange) {
      this.props.onChange(inputValue);
    }
  }

  private handlePlateClicked() {
    if (this.amountInput) {
      this.amountInput.focus();
    }
  }

  private renderBalance() {
    const { balance, currency } = this.props;
    const formattedBalance = formatMoney(balance, currency);

    return (
      <div className={style.balance}>You have {formattedBalance}</div>
    );
  }

  private renderRate() {
    const { rate, currency } = this.props;

    return (
      <div className={style.rate}>
        {rate}
      </div>
    );
  }
}
