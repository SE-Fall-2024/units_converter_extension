var assert = require("assert");
const { getPrecisionV, getPreciseNumberV } = require("../code/conversions/conversion");

describe('Precision Value', function() {

  it("should return the correct precision for positive integers", function () {
    assert.strictEqual(getPrecisionV(123), 3);
    assert.strictEqual(getPrecisionV(0), 1);
    assert.strictEqual(getPrecisionV(1000), 4);
  });

  it("should return the correct precision for negative integers", function () {
    assert.strictEqual(getPrecisionV(-123), 3);
    assert.strictEqual(getPrecisionV(-1), 1);
    assert.strictEqual(getPrecisionV(-1000), 4);
  });

  it("should return the correct precision for positive floating-point numbers", function () {
    assert.strictEqual(getPrecisionV(123.456), 6);
    assert.strictEqual(getPrecisionV(0.123), 3);
    assert.strictEqual(getPrecisionV(1000.5), 5);
  });

  it("should return the correct precision for negative floating-point numbers", function () {
    assert.strictEqual(getPrecisionV(-123.456), 6);
    assert.strictEqual(getPrecisionV(-0.123), 3);
    assert.strictEqual(getPrecisionV(-1000.5), 5);
  });

  it("should return the correct precision for numbers with no integer part", function () {
    assert.strictEqual(getPrecisionV(.456), 3);
    assert.strictEqual(getPrecisionV(-.456), 3);
    assert.strictEqual(getPrecisionV(.5), 1);
  });

  it("should handle cases with zeroes in decimal places correctly", function () {
    assert.strictEqual(getPrecisionV(123.400), 4); // trailing zeros in decimal part
    assert.strictEqual(getPrecisionV(-0.001), 3); // leading zeros in decimal part
    assert.strictEqual(getPrecisionV(100.000), 3); // trailing zeros after a whole number
  });
  
  // TESTING " GET PRECISE NUMBER VALUE "

  it("should always round to 3 decimal points for any positive number", function () {
    assert.strictEqual(getPreciseNumberV(123.456789, 2), 123.457); // rounds to 2 decimal places
    assert.strictEqual(getPreciseNumberV(123.456789, 11), 123.457); // rounds to 4 decimal places
    assert.strictEqual(getPreciseNumberV(0, 6), 0);
  });

  it("should return the number rounded to the specified precision for a negative number", function () {
    assert.strictEqual(getPreciseNumberV(-123.456789, 11), '-123.4567890'); // chooses 10 !
    assert.strictEqual(getPreciseNumberV(-123.456788, 1), '-123.456788'); // chooses precisionV
    assert.strictEqual(getPreciseNumberV(-123.45678, 9), '-123.456780');  //chooses precision
  });

  it("should handle precision greater than the number’s significant digits", function () {
    assert.strictEqual(getPreciseNumberV(12.34, 5), 12.340); // adds trailing zeros
    assert.strictEqual(getPreciseNumberV(-12.34, 5), '-12.340'); // adds trailing zeros for negative
  });

  it("should round correctly to 3 decimal places when precision not specified", function () {
    assert.strictEqual(getPreciseNumberV(123.4567), 123.457); // default to 3 decimals, rounding up
    assert.strictEqual(getPreciseNumberV(123.4), 123.4); // default to 3 decimals, no change needed
    assert.strictEqual(getPreciseNumberV(0.34567), 0.346); // default to 3 decimals, no change needed
  });

});
