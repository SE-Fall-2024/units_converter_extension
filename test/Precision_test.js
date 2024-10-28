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

});
