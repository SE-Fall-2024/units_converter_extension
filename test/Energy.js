var assert = require('assert');

const {
  getStandardConversion,
  getAllConversions,
} = require('../code/conversions/conversion');

describe('Energy', function () {
  describe('#getStandardConversion(quantity)', function () {
    // joule
    const unit_object_joule = {
      unit: 'joule',
      type: 'energy',
      aliases: ['joule', 'J'],
      ratio: 1,
    };
    const object_list_energy = [
      'joule',
      'kilojoule',
      'gram calorie',
      'kilocalorie',
      'watt hour',
      'kilowatt hour',
      'electronvolt',
      'british thermal unit',
      'us therm',
      'foot-pound',
    ];
    it('should return 3 when quantity is 3 joules', function () {
      assert.strictEqual(getStandardConversion(unit_object_joule, 3), 3);
    });

    // kilojoule
    const unit_object_kilojoule = {
      unit: 'kilojoule',
      type: 'energy',
      aliases: ['kilojoule', 'kJ'],
      ratio: 0.001,
    };
    it('should return 3000 when quantity is 3 kilojoules', function () {
      assert.strictEqual(getStandardConversion(unit_object_kilojoule, 3), 3000);
    });

    // gram calorie
    const unit_object_calorie = {
      unit: 'gram calorie',
      type: 'energy',
      aliases: ['gram calorie', 'cal'],
      ratio: 0.239006, // 1 joule = 0.239006 gram calories
    };
    it('should return approximately 12.552 when quantity is 3 gram calories', function () {
      assert.strictEqual(
        getStandardConversion(unit_object_calorie, 3).toFixed(3),
        (3 / 0.239006).toFixed(3)
      );
    });

    // kilocalorie
    const unit_object_kilocalorie = {
      unit: 'kilocalorie',
      type: 'energy',
      aliases: ['kilocalorie', 'kcal', 'Cal'],
      ratio: 0.000239006,
    };
    it('should return approximately 12552.18 when quantity is 3 kilocalories', function () {
      assert.strictEqual(
        getStandardConversion(unit_object_kilocalorie, 3).toFixed(2),
        (3 / 0.000239006).toFixed(2)
      );
    });

    // watt hour
    const unit_object_wh = {
      unit: 'watt hour',
      type: 'energy',
      aliases: ['watt hour', 'Wh'],
      ratio: 0.000277778,
    };
    it('should return approximately 10800 when quantity is 3 watt hours', function () {
      assert.strictEqual(
        getStandardConversion(unit_object_wh, 3).toFixed(0),
        (3 / 0.000277778).toFixed(0)
      );
    });

    // kilowatt hour
    const unit_object_kwh = {
      unit: 'kilowatt hour',
      type: 'energy',
      aliases: ['kilowatt hour', 'kWh'],
      ratio: 0.000000277778,
    };
    it('should return approximately 10800000 when quantity is 3 kilowatt hours', function () {
      assert.strictEqual(
        getStandardConversion(unit_object_kwh, 3).toFixed(0),
        (3 / 0.000000277778).toFixed(0)
      );
    });

    // electronvolt
    const unit_object_ev = {
      unit: 'electronvolt',
      type: 'energy',
      aliases: ['electronvolt', 'eV'],
      ratio: 1 / 6.242e18, // ratio to convert from electronvolts to joules
    };
    it('should return approximately 1.8726e19 when quantity is 3 electronvolts', function () {
      assert.strictEqual(
        getStandardConversion(unit_object_ev, 3).toFixed(2),
        (3 / (1 / 6.242e18)).toFixed(2)
      );
    });

    // british thermal unit
    const unit_object_btu = {
      unit: 'british thermal unit',
      type: 'energy',
      aliases: ['british thermal unit', 'BTU', 'btu'],
      ratio: 0.000947817,
    };
    it('should return approximately 3168.73 when quantity is 3 BTUs', function () {
      assert.strictEqual(
        getStandardConversion(unit_object_btu, 3).toFixed(2),
        (3 / 0.000947817).toFixed(2)
      );
    });

    // us therm
    const unit_object_therm = {
      unit: 'us therm',
      type: 'energy',
      aliases: ['us therm', 'therm'],
      ratio: 9.4804e-6,
    };
    it('should return a very large number when quantity is 3 therms', function () {
      assert.strictEqual(
        getStandardConversion(unit_object_therm, 3).toFixed(2),
        (3 / 9.4804e-6).toFixed(2)
      );
    });

    // foot-pound
    const unit_object_ft_lb = {
      unit: 'foot-pound',
      type: 'energy',
      aliases: ['foot-pound', 'ft-lb', 'ft lb'],
      ratio: 0.737562,
    };

    it('should return approximately 4.07 when quantity is 3 foot-pounds', function () {
      assert.strictEqual(
        getStandardConversion(unit_object_ft_lb, 3).toFixed(2),
        (3 / 0.737562).toFixed(2)
      );
    });

    // Non-nominal tests
    it('should handle a very large energy value in joules without precision errors', function () {
      assert.strictEqual(getStandardConversion(unit_object_joule, 1e15), 1e15);
    });

    it('should return NaN when a string is passed as quantity for joules', function () {
      assert.ok(isNaN(getStandardConversion(unit_object_joule, 'three')));
    });

    it('should handle floating-point values accurately for electronvolts', function () {
      assert.strictEqual(
        getStandardConversion(unit_object_ev, 1.234e-9).toFixed(3),
        (1.234e-9 / (1 / 6.242e18)).toFixed(3)
      );
    });
  });
});
