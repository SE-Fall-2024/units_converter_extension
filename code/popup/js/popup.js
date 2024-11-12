const unit = [];
unit['usd'] = '$';
unit['eur'] = '€';
unit['gbp'] = '£';
unit['inr'] = '₹';
unit['yen'] = '¥';
unit['cad'] = 'C$';
unit['aud'] = 'AU$';
unit['chf'] = 'Fr';
unit['cny'] = '¥';
unit['celcius'] = '°C';
unit['fahrenheit'] = '°F';
unit['kelvin'] = '°K';

const populateCustomUnit = () => {
  const baseUnit = $('#custom_unit_base');
  const customTypeSelector = $('#custom_type_selector');
  const deleteCustomTypeSelector = $('#delete_type_selector');

  const unitField = UNITS.filter((unit) => {
    return unit.type === customTypeSelector.val() && unit.ratio === 1;
  });
  console.log(unitField);
  baseUnit.empty();
  baseUnit.html(unitField[0].unit);

  getAllUnits().then((unitsData) => {
    console.log(unitsData);
    const type = customTypeSelector.val();
    const POPULAR_UNIT = unitsData.reduce((accumulator, currentUnit) => {
      if (currentUnit.type && currentUnit.aliases) {
        if (accumulator[currentUnit.type]) {
          accumulator[currentUnit.type].push(currentUnit.unit);
        } else {
          accumulator[currentUnit.type] = [currentUnit.unit];
        }
      }
      return accumulator;
    }, {});

    let notFound = true;
    deleteCustomTypeSelector.empty();
    POPULAR_UNIT[type].forEach(function (unit) {
      if (!POPULAR_UNITS[type].includes(unit)) {
        notFound = false;
        deleteCustomTypeSelector.append(
          $('<option>', {
            value: unit,
            text: unit.charAt(0).toUpperCase() + unit.slice(1), // Capitalize the first letter
          })
        );
      }
    });

    if (notFound) {
      deleteCustomTypeSelector.append(
        $('<option>', {
          value: 'No Custom Unit Found',
          text: 'No Custom Unit Found',
        })
      );

      $('#custom_unit_delete').hide();
    } else {
      $('#custom_unit_delete').show();
    }
  });
};

const addCustomUnitVal = () => {
  const baseUnit = $('#custom_unit_base').val();
  const customTypeSelector = $('#custom_type_selector').val();
  const customUnitName = $('#custom_unit_name_left').val();
  const customUnitRatio = $('#custom_unit_value_right').val();

  addCustomUnit({
    unit: customUnitName,
    type: customTypeSelector,
    aliases: [customUnitName],
    ratio: customUnitRatio,
  }).then(() => {
    populateCustomUnit();
  });

  $('#custom_unit_name_left').val('');
  $('#custom_unit_value_right').val('');
};

const deleteCustomUnitVal = () => {
  const baseUnit = $('#custom_unit_base').val();
  const customTypeSelector = $('#custom_type_selector').val();
  const customUnitName = $('#delete_type_selector').val();

  deleteCustomUnit({
    unit: customUnitName,
    type: customTypeSelector,
    aliases: [customUnitName],
  }).then(() => {
    populateCustomUnit();
  });

  $('#custom_unit_name_left').val('');
  $('#custom_unit_value_right').val('');
};

const getConversion = async (change) => {
  const typeSelector = $('#type_selector').val();

  if (typeSelector === '') {
    return;
  }

  let unitSelectorLeftVal = $('#unit_selector_left').val();
  let unitSelectorRightVal = $('#unit_selector_right').val();

  const leftVal = $('#left_input').val();
  const rightVal = $('#right_input').val();

  if (unitSelectorRightVal === 'jpy') {
    unitSelectorRightVal = 'yen';
  }
  if (unitSelectorLeftVal === 'jpy') {
    unitSelectorLeftVal = 'yen';
  }

  console.log(
    `${leftVal} ${unitSelectorLeftVal}`,
    `${rightVal} ${unitSelectorRightVal}`
  );
  let result;
  if (change === 'left') {
    result = await get_conversions(`${leftVal} ${unitSelectorLeftVal}`);
  } else {
    result = await get_conversions(`${rightVal} ${unitSelectorRightVal}`);
  }

  const elements = result.split(',').filter((element) => element.trim() !== '');
  console.log(elements, unitSelectorRightVal, unitSelectorLeftVal);

  if (typeSelector === 'currency' || typeSelector === 'temperature') {
    unitSelectorRightVal = unit[unitSelectorRightVal];
    unitSelectorLeftVal = unit[unitSelectorLeftVal];
  }
  console.log(unitSelectorRightVal, unitSelectorLeftVal);

  if (change === 'left') {
    $('#right_input').val(
      elements[
        elements.findIndex((ele) => ele.indexOf(unitSelectorRightVal) > -1)
      ].split(' ')[typeSelector === 'currency' ? 1 : 0]
    );
  } else {
    $('#left_input').val(
      elements[
        elements.findIndex((ele) => ele.indexOf(unitSelectorLeftVal) > -1)
      ].split(' ')[typeSelector === 'currency' ? 1 : 0]
    );
  }

  const currencyInstance = new Currency();
  $(function () {
    // Currency symbols
    const unit = {
      usd: '$',
      eur: '€',
      gbp: '£',
      inr: '₹',
      yen: '¥',
      cad: 'C$',
      aud: 'AU$',
      chf: 'Fr',
      cny: '¥',
      celcius: '°C',
      fahrenheit: '°F',
      kelvin: '°K',
    };

    const currencies = [
      'USD',
      'EUR',
      'GBP',
      'INR',
      'JPY',
      'CAD',
      'AUD',
      'CHF',
      'CNY',
    ];

    // Populate target currency based on base currency selection
    $('#base_currency').on('change', function () {
      const baseCurrency = $(this).val();
      const targetCurrencyDropdown = $('#target_currency');

      // Clear current options in target currency dropdown
      targetCurrencyDropdown.empty();

      // Repopulate target currency dropdown, excluding base currency
      currencies.forEach((currency) => {
        if (currency !== baseCurrency) {
          targetCurrencyDropdown.append(new Option(currency, currency));
        }
      });
    });
    $('#base_currency').trigger('change');
    // Event listener for the convert button
    $('#compare_button').on('click', async function () {
      const date = $('#historical_date').val();
      const baseCurrency = $('#base_currency').val();
      const targetCurrency = $('#target_currency').val();
      const amount = $('#amount').val();

      if (date && baseCurrency && targetCurrency && amount) {
        const currencyInstance = new Currency();
        const rate = await currencyInstance.getHistoricalData(
          baseCurrency,
          targetCurrency,
          date,
          amount
        );
        const resultDiv = $('#result');

        if (rate) {
          resultDiv.text(
            `On ${date}, ${amount} ${baseCurrency} = ${rate} ${targetCurrency}`
          );
        } else {
          resultDiv.text('Error fetching historical rate.');
        }
      } else {
        alert('Please fill in all fields.');
      }
    });
  });
};

function updateUnitSelectorsRight(type) {
  const unitSelectorLeft = $('#unit_selector_left');
  const unitSelectorRight = $('#unit_selector_right');

  const selectedUnitLeft = unitSelectorLeft.val();
  const selectedUnitRight = unitSelectorRight.val();

  // Clear and repopulate the right unit selector
  unitSelectorRight.empty();
  // Filter out the selected unit from the left unit selector
  POPULAR_UNITS[type]
    .filter((unit) => unit !== selectedUnitLeft)
    .forEach(function (unit) {
      unitSelectorRight.append(
        $('<option>', {
          value: unit,
          text: unit.charAt(0).toUpperCase() + unit.slice(1), // Capitalize the first letter
        })
      );
    });
  if (unitSelectorRight.val() !== selectedUnitLeft)
    unitSelectorLeft.val(selectedUnitLeft);
  if (unitSelectorLeft.val() !== selectedUnitRight)
    unitSelectorRight.val(selectedUnitRight);
  getConversion('left');
}

function updateUnitSelectorsLeft(type) {
  const unitSelectorLeft = $('#unit_selector_left');
  const unitSelectorRight = $('#unit_selector_right');

  const selectedUnitLeft = unitSelectorLeft.val();
  const selectedUnitRight = unitSelectorRight.val();

  // Clear and repopulate the right unit selector
  unitSelectorLeft.empty();
  POPULAR_UNITS[type].forEach(function (unit) {
    unitSelectorLeft.append(
      $('<option>', {
        value: unit,
        text: unit.charAt(0).toUpperCase() + unit.slice(1), // Capitalize the first letter
      })
    );
  });
  if (unitSelectorRight.val() !== selectedUnitLeft)
    unitSelectorLeft.val(selectedUnitLeft);
  if (unitSelectorLeft.val() !== selectedUnitRight)
    unitSelectorRight.val(selectedUnitRight);
  getConversion('left');
}

const populateUnit = () => {
  const unitSelector = $('#unit_selector_left');
  const type = $('#type_selector').val();

  unitSelector.off('change');

  unitSelector.empty();
  getAllUnits().then((unitsData) => {
    console.log(unitsData);
    const POPULAR_UNITS = unitsData.reduce((accumulator, currentUnit) => {
      if (currentUnit.type && currentUnit.aliases) {
        if (accumulator[currentUnit.type]) {
          accumulator[currentUnit.type].push(currentUnit.unit);
        } else {
          accumulator[currentUnit.type] = [currentUnit.unit];
        }
      }
      return accumulator;
    }, {});

    POPULAR_UNITS[type].forEach(function (unit) {
      unitSelector.append(
        $('<option>', {
          value: unit,
          text: unit.charAt(0).toUpperCase() + unit.slice(1), // Capitalize the first letter
        })
      );
    });

    // there is unit_selector_right, it should have all the value same as left just expect the value selected in left

    const unitSelectorRight = $('#unit_selector_right');
    unitSelectorRight.off('change');
    console.log(unitSelectorRight);
    unitSelectorRight.empty();
    POPULAR_UNITS[type]
      .filter((unit) => unit !== unitSelector.val())
      .forEach(function (unit) {
        unitSelectorRight.append(
          $('<option>', {
            value: unit,
            text: unit.charAt(0).toUpperCase() + unit.slice(1), // Capitalize the first letter
          })
        );
      });

    unitSelector.on('change', function () {
      updateUnitSelectorsRight(type);
    });

    unitSelectorRight.on('change', function () {
      updateUnitSelectorsLeft(type);
    });

    getConversion('left');
  });
};

const handleCheckboxChange = async (e) => {
  const val = $(e).val();
  let favouriteArr = chrome.storage.sync
    .get(['favouriteArr'])
    .then(async (result) => {
      console.log(result, val);
      favouriteArr = result.favouriteArr ? JSON.parse(result.favouriteArr) : [];
      if ($(e).is(':checked')) {
        favouriteArr.push(val);
      } else {
        favouriteArr = favouriteArr.filter((ele) => ele !== val);
      }
      console.log(favouriteArr);
      localStorage.setItem('favouriteArr', JSON.stringify(favouriteArr));
      await chrome.storage.sync.set({
        favouriteArr: JSON.stringify(favouriteArr),
      });
    });
};

const populateFavUnit = () => {
  const container = $('#units_container');
  const type = $('#favourite_type_selector').val();
  container.empty();
  const favouriteArr = localStorage.getItem('favouriteArr')
    ? JSON.parse(localStorage.getItem('favouriteArr'))
    : [];

  getAllUnits().then((unitsData) => {
    console.log(unitsData);
    const POPULAR_UNITS = unitsData.reduce((accumulator, currentUnit) => {
      if (currentUnit.type && currentUnit.aliases) {
        if (accumulator[currentUnit.type]) {
          accumulator[currentUnit.type].push(currentUnit.unit);
        } else {
          accumulator[currentUnit.type] = [currentUnit.unit];
        }
      }
      return accumulator;
    }, {});

    POPULAR_UNITS[type].forEach(function (ut) {
      var checkbox = $('<input>', {
        type: 'checkbox',
        id: 'checkbox_' + ut,
        value:
          type === 'currency' || type === 'temperature'
            ? unit[ut.toLocaleLowerCase()]
            : ut,
        checked:
          type === 'currency' || type === 'temperature'
            ? favouriteArr.includes(unit[ut.toLocaleLowerCase()])
              ? true
              : false
            : favouriteArr.includes(ut)
              ? true
              : false,
      });

      var label = $('<label>', {
        for: 'checkbox_' + ut,
        text: ut.charAt(0).toUpperCase() + ut.slice(1), // Capitalize the first letter
      });

      // Append the checkbox and label to the li element
      container.append($('<li>').append(checkbox, label));

      // Attach the onchange event handler using jQuery's on method
      checkbox.on('change', function () {
        handleCheckboxChange(this);
      });
    });
  });
};

$(function () {
  // type Selector Populate
  const typeSelector = $('#type_selector');
  const favouriteTypeSelector = $('#favourite_type_selector');
  const customTypeSelector = $('#custom_type_selector');
  const historyTypeSelector = $('#history_type_selector');
  const typeSelectorOptionsArray = Object.keys(POPULAR_UNITS);

  typeSelectorOptionsArray.forEach(function (type) {
    typeSelector.append(
      $('<option>', {
        value: type,
        text: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize the first letter
      })
    );

    favouriteTypeSelector.append(
      $('<option>', {
        value: type,
        text: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize the first letter
      })
    );

    console.log(type);
    if (type !== 'temperature' && type !== 'currency') {
      customTypeSelector.append(
        $('<option>', {
          value: type,
          text: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize the first letter
        })
      );
    }

    if (type === 'currency') {
      POPULAR_UNITS['currency'].forEach(function (currency) {
        historyTypeSelector.append(
          $('<option>', {
            value: currency,
            text: currency.charAt(0).toUpperCase() + currency.slice(1), // Capitalize the first letter
          })
        );
      });
    }
  });

  $('#custom_unit_add').on('click', function (e) {
    addCustomUnitVal(e);
  });

  $('#custom_unit_delete').on('click', function (e) {
    deleteCustomUnitVal(e);
  });

  $('#toggle_theme').on('change', function () {
    console.log('switch theme...');
    document.body.classList.toggle('dark-theme', this.checked);
  });

  typeSelector.on('change', function (e) {
    populateUnit(e);
  });

  customTypeSelector.on('change', function (e) {
    populateCustomUnit(e);
  });

  historyTypeSelector.on('change', function () {
    const selectedCurrency = $(this).val();
    console.log(selectedCurrency);

    const graphUrl = './js/poop.png'; // Change this to the actual URL for your graphs
    $('#currency_graph').attr('src', graphUrl).show();

    // const xValues = [50,60,70,80,90,100,110,120,130,140,150];
    // const yValues = [7,8,8,9,9,9,10,11,14,14,15];

    // new Chart(document.getElementById('myChart'), {
    //     type: "line",
    //     data: {
    //         labels: xValues,
    //         datasets: [{
    //             label: "Historical Exchange Rates",
    //             data: yValues,
    //             fill: false
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         scales: {
    //             y: {
    //                 beginAtZero: false
    //             }
    //         }
    //     }
    // });
  });

  const unitSelectorLeftVal = $('#left_input');
  const unitSelectorRightVal = $('#right_input');

  unitSelectorLeftVal.on('change', function () {
    getConversion('left');
  });

  unitSelectorRightVal.on('change', function () {
    getConversion('right');
  });
  populateUnit();
  populateFavUnit();
  populateCustomUnit();

  $('.tablinks').on('click', function () {
    // let type = $(this).attr("id")
    $('.tablinks').removeClass('selected');
    $(this).addClass('selected');
    const tab = $(this).children().html();
    $('.tab_container').hide();
    $(`.${tab}`).show();
  });

  $('#favourite_type_selector').on('change', function (e) {
    populateFavUnit(e);
  });
});
