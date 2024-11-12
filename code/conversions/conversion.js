// /**
//  * @param {Number} number input number value
//  * @returns returns value with accuracy of input number decimal points
//  */
const getPrecisionV = (number) => {
  number = number < 0 ? -1 * number : number;

  const parts = number.toString().split('.');
  if (parts.length > 1) {
    const intPart = parts[0].replace(/^0+/, '');
    return intPart.length + parts[1].toString().length;
  }
  return parts[0].length;

};

/**
 * Returns a rounded version of the given number, 
 * rounded precisely to the number of decimal points needed
 * The precision needed is the max value between the given precision 
 *  and current precision of the number. 
 * @param {Number} number 
 * @param {Number} precision 
 * @returns The rounded number value
 */
const getPreciseNumberV = (number, precision) => {
  if (number < 0) {
    return number.toPrecision(
      Math.min(Math.max(getPrecisionV(number), precision), 10)
    );
  }
  return Math.round(number * 1000) / 1000;
};

/**
 * @param {Number} quantity input number
 * @returns returns value with accuracy of 10 decimal points
 */
const getStandardConversion = (unitObject, quantity) => {
  return quantity / unitObject.ratio;
};

/**
 * From our standard conversion we try to convert into all the other units specified in arr property of this class with a precision no more than 10
 * @param {Number} quantity input quantity number
 * @param {Number} precision input precision digit
 * @returns all values with accuracy of 10 decimal points
 */
/**/
const getAllConversions = async (
  quantity,
  precision,
  unitObject,
  listOfUnits
) => {
  let res = '';
  const toUnits = listOfUnits.filter((object) => {
    return object.type === unitObject.type && object.unit !== unitObject.unit;
  });

  toUnits.forEach((u) => {
    res +=
      ',' + getPreciseNumberV(quantity * u.ratio, precision) + ' ' + u.unit;
  });

  return res;
};

// exports = {getStandardConversion,getAllConversions,getPrecisionV,getPreciseNumberV};
module.exports = {
  getStandardConversion,
  getAllConversions,
  getPrecisionV,
  getPreciseNumberV
};

