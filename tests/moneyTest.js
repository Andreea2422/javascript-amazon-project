import { formatCurrency } from '../scripts/utils/money.js';

// describe('formatCurrency', () => {
//     it('should format numbers as USD currency', () => {
//         expect(formatCurrency(1000)).toBe('1000.00');
//         expect(formatCurrency(1234.56)).toBe('1234.56');
//     });

//     it('should handle non-numeric input', () => {
//         expect(formatCurrency('abc')).toBe('0.00');
//         expect(formatCurrency(null)).toBe('0.00');
//     });
// });

console.log('test suite: formatCurrency');

console.log('Converts cents into dollars');
if (formatCurrency(2095) === '20.95') {
    console.log('Test passed');
} else {
    console.log('Test failed');
}
console.log('Works with 0');
if (formatCurrency(0) === '0.00') {
    console.log('Test passed');
} else {
    console.log('Test failed');
}
console.log('Rounds up to the nearest cent');
if (formatCurrency(2000.5) === '20.01') {
    console.log('Test passed');
} else {
    console.log('Test failed');
}