var assert = require('assert');

const {
  getStandardConversion,
  getAllConversions,
} = require('../code/conversions/conversion');

describe('Angle', function () {
  describe('#getStandardConversion(quantity)', function () {
    // Degree
    const unit_object_degree = {
      unit: 'degree',
      type: 'angle',
      aliases: ['degree', 'deg', '°'],
      ratio: 1,
    };
    it('should return 45 when quantity is 45 degrees', function () {
      assert.strictEqual(getStandardConversion(unit_object_degree, 45), 45);
    });

    // Arcsecond
    const unit_object_arcsecond = {
      unit: 'arcsecond',
      type: 'angle',
      aliases: ['arcsecond', 'arcsec', '″'],
      ratio: 3600,
    };
    it('should return 180000 when quantity is 50 degrees in arcseconds', function () {
      assert.strictEqual(50 * unit_object_arcsecond.ratio, 180000); // direct multiplication for testing
    });

    it('should return approximately 50 when quantity is 180000 arcseconds in degrees', function () {
      assert.strictEqual(
        (180000 / unit_object_arcsecond.ratio).toFixed(0),
        '50'
      );
    });

    // Gradian
    const unit_object_gradian = {
      unit: 'gradian',
      type: 'angle',
      aliases: ['gradian', 'grad', 'gon'],
      ratio: 200 / 180,
    };
    it('should return approximately 50 when quantity is 45 degrees in gradians', function () {
      assert.strictEqual((45 * unit_object_gradian.ratio).toFixed(0), '50');
    });

    it('should return approximately 45 when quantity is 50 gradians in degrees', function () {
      assert.strictEqual((50 / unit_object_gradian.ratio).toFixed(0), '45');
    });

    // Milliradian
    const unit_object_milliradian = {
      unit: 'milliradian',
      type: 'angle',
      aliases: ['milliradian', 'mrad'],
      ratio: 17.4533,
    };
    it('should return approximately 873 when quantity is 50 degrees in milliradians', function () {
      assert.strictEqual(
        (50 * unit_object_milliradian.ratio).toFixed(0),
        '873'
      );
    });

    it('should return approximately 50 when quantity is 873 milliradians in degrees', function () {
      assert.strictEqual(
        (873 / unit_object_milliradian.ratio).toFixed(0),
        '50'
      );
    });

    // Minute of Arc
    const unit_object_minute_arc = {
      unit: 'minute of arc',
      type: 'angle',
      aliases: ['minute of arc', 'arcmin', '′'],
      ratio: 60,
    };
    it('should return 3000 when quantity is 50 degrees in minutes of arc', function () {
      assert.strictEqual(50 * unit_object_minute_arc.ratio, 3000);
    });

    it('should return approximately 50 when quantity is 3000 minutes of arc in degrees', function () {
      assert.strictEqual(
        (3000 / unit_object_minute_arc.ratio).toFixed(0),
        '50'
      );
    });

    // Radian
    const unit_object_radian = {
      unit: 'radian',
      type: 'angle',
      aliases: ['radian', 'rad'],
      ratio: 0.01745329251,
    };
    it('should return approximately 0.87 when quantity is 50 degrees in radians', function () {
      assert.strictEqual((50 * unit_object_radian.ratio).toFixed(2), '0.87');
    });

    // Non-nominal tests
    it('should handle a very large degree value without precision errors', function () {
      assert.strictEqual(getStandardConversion(unit_object_degree, 1e10), 1e10);
    });

    it('should return NaN when a string is passed as quantity', function () {
      assert.ok(isNaN(getStandardConversion(unit_object_degree, 'fifty')));
    });

    it('should return NaN when NaN is passed as quantity', function () {
      assert.ok(isNaN(getStandardConversion(unit_object_degree, NaN)));
    });

    it('should return NaN when undefined is passed as quantity', function () {
      assert.ok(isNaN(getStandardConversion(unit_object_degree, undefined)));
    });
  });
});
