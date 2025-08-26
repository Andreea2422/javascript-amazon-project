import { formatCurrency } from '../scripts/utils/money.js';

describe('Test Suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(1000)).toEqual('10.00');
    expect(formatCurrency(1234)).toEqual('12.34');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});
