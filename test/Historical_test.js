 // Historical_test.js
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const Currency = require("../code/conversions/Currency");

describe("Currency.getHistoricalData", function () {
    let currency;
    let fetchStub;

    before(() => {
        currency = new Currency();
    });

    beforeEach(() => {
        fetchStub = sinon.stub(global, "fetch");
        // Suppress console warnings and errors
        sinon.stub(console, 'warn');
        sinon.stub(console, 'error');
    });
    
    afterEach(() => {
        fetchStub.restore();
        console.warn.restore();
        console.error.restore();
    });
        

    // Basic successful response test
    it("should return a mocked conversion rate for USD to EUR on a specific date", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: true, result: 0.85 }),
        });

        const result = await currency.getHistoricalData("USD", "EUR", "2023-01-01", 1);
        expect(result).to.equal(0.85);
        sinon.assert.calledOnce(fetchStub);
    });

    // API failure test
    it("should handle API failure correctly", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: false }),
        });

        const result = await currency.getHistoricalData("USD", "EUR", "2023-01-01", 1);
        expect(result).to.be.null;
        sinon.assert.calledOnce(fetchStub);
    });

    // Network error test
    it("should return null for an invalid date format", async function () {
        // No need to stub fetch since the method won't call it with invalid date
        const result = await currency.getHistoricalData("USD", "EUR", "01-01-2023", 1);
        expect(result).to.be.null;
    });
    

    // Invalid date format
    it("should return null for an invalid date format", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: true, result: 0.9 }),
        });

        const result = await currency.getHistoricalData("USD", "EUR", "01-01-2023", 1);
        expect(result).to.be.null;
    });

    // Test for amount greater than 1
    it("should return correct conversion for amount > 1", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: true, result: 1.7 }),
        });

        const result = await currency.getHistoricalData("USD", "EUR", "2023-01-01", 2);
        expect(result).to.equal(1.7);
    });

    // Test for different currency pairs
    it("should handle different currency pairs (USD to GBP)", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: true, result: 0.75 }),
        });

        const result = await currency.getHistoricalData("USD", "GBP", "2023-01-01", 1);
        expect(result).to.equal(0.75);
    });

    it("should handle different currency pairs (EUR to JPY)", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: true, result: 130 }),
        });

        const result = await currency.getHistoricalData("EUR", "JPY", "2023-01-01", 1);
        expect(result).to.equal(130);
    });

    // Future date test
    it("should return null for a future date", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: false }),
        });

        const result = await currency.getHistoricalData("USD", "EUR", "2050-01-01", 1);
        expect(result).to.be.null;
    });

    // Invalid currency code test
    it("should return null for an invalid base currency code", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: true, result: null }),
        });

        const result = await currency.getHistoricalData("XYZ", "EUR", "2023-01-01", 1);
        expect(result).to.be.null;
    });

    it("should return null for an invalid target currency code", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: true, result: null }),
        });

        const result = await currency.getHistoricalData("USD", "XYZ", "2023-01-01", 1);
        expect(result).to.be.null;
    });

    // Edge case: amount is 0
    it("should return 0 for a conversion amount of 0", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: true, result: 0 }),
        });

        const result = await currency.getHistoricalData("USD", "EUR", "2023-01-01", 0);
        expect(result).to.equal(0);
    });

    // Edge case: negative amount
    it("should handle negative amount correctly", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: true, result: -0.85 }),
        });

        const result = await currency.getHistoricalData("USD", "EUR", "2023-01-01", -1);
        expect(result).to.equal(-0.85);
    });

    // Edge case: very large amount
    it("should handle very large amount correctly", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: true, result: 850000 }),
        });

        const result = await currency.getHistoricalData("USD", "EUR", "2023-01-01", 1000000);
        expect(result).to.equal(850000);
    });

    // Edge case: very small amount
    it("should handle very small amount correctly", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: true, result: 0.00085 }),
        });

        const result = await currency.getHistoricalData("USD", "EUR", "2023-01-01", 0.001);
        expect(result).to.equal(0.00085);
    });

    // Missing parameters
    it("should return null if date is missing", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: false }),
        });

        const result = await currency.getHistoricalData("USD", "EUR", "", 1);
        expect(result).to.be.null;
    });

    it("should return null if base currency is missing", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: false }),
        });

        const result = await currency.getHistoricalData("", "EUR", "2023-01-01", 1);
        expect(result).to.be.null;
    });

    it("should return null if target currency is missing", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: false }),
        });

        const result = await currency.getHistoricalData("USD", "", "2023-01-01", 1);
        expect(result).to.be.null;
    });

    // Test for special characters in currency codes
    it("should return null for special characters in base currency code", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: false }),
        });

        const result = await currency.getHistoricalData("U$D", "EUR", "2023-01-01", 1);
        expect(result).to.be.null;
    });

    it("should return null for special characters in target currency code", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: false }),
        });

        const result = await currency.getHistoricalData("USD", "EU#", "2023-01-01", 1);
        expect(result).to.be.null;
    });

    // Test if API limit reached
    it("should handle API limit reached response", async function () {
        fetchStub.resolves({
            json: () => Promise.resolve({ success: false, error: "API limit reached" }),
        });

        const result = await currency.getHistoricalData("USD", "EUR", "2023-01-01", 1);
        expect(result).to.be.null;
    });
});
