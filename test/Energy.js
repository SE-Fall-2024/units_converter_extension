var assert = require('assert');

const {
    getStandardConversion,
    getAllConversions,
} = require('../code/conversions/conversion');

describe('Frequency', function () {
    describe('#getStandardConversion(quantity)', function () {
        // Hertz
        const unit_object_hz = {
            unit: 'hertz',
            type: 'frequency',
            aliases: ['hertz', 'Hz'],
            ratio: 1,
        };
        it('should return 5 when quantity is 5 hertz', function () {
            assert.strictEqual(getStandardConversion(unit_object_hz, 5), 5);
        });

        // Kilohertz
        const unit_object_khz = {
            unit: 'kilohertz',
            type: 'frequency',
            aliases: ['kilohertz', 'kHz'],
            ratio: 0.001,
        };
        it('should return 5000 when quantity is 5 kilohertz', function () {
            assert.strictEqual(getStandardConversion(unit_object_khz, 5), 5000);
        });

        it('should return 500 when quantity is 0.5 kilohertz', function () {
            assert.strictEqual(getStandardConversion(unit_object_khz, 0.5), 500);
        });

        it('should return approximately 5 when quantity is 5000 hertz in kilohertz', function () {
            assert.strictEqual((5000 * unit_object_khz.ratio).toFixed(3), '5.000');
        });

        // Megahertz
        const unit_object_mhz = {
            unit: 'megahertz',
            type: 'frequency',
            aliases: ['megahertz', 'MHz'],
            ratio: 0.000001,
        };
        it('should return 5000000 when quantity is 5 megahertz', function () {
            assert.strictEqual(getStandardConversion(unit_object_mhz, 5), 5000000);
        });

        it('should return approximately 5 when quantity is 5000000 hertz in megahertz', function () {
            assert.strictEqual((5000000 * unit_object_mhz.ratio).toFixed(0), '5');
        });

        // Gigahertz
        const unit_object_ghz = {
            unit: 'gigahertz',
            type: 'frequency',
            aliases: ['gigahertz', 'GHz'],
            ratio: 0.000000001,
        };
        it('should return 5000000000 when quantity is 5 gigahertz', function () {
            assert.strictEqual(getStandardConversion(unit_object_ghz, 5), 5000000000);
        });

        it('should return approximately 5 when quantity is 5000000000 hertz in gigahertz', function () {
            assert.strictEqual((5000000000 * unit_object_ghz.ratio).toFixed(0), '5');
        });

        // Combined tests
        it('should return 1000 kilohertz when quantity is 1 megahertz', function () {
            const megahertz_in_hz = getStandardConversion(unit_object_mhz, 1);
            assert.strictEqual((megahertz_in_hz * unit_object_khz.ratio).toFixed(0), '1000');
        });

        it('should return 1000000 hertz when quantity is 1 megahertz', function () {
            assert.strictEqual(getStandardConversion(unit_object_mhz, 1), 1000000);
        });
    });
});
