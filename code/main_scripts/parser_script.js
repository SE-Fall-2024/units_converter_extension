/**
 * @async
 * @function get_conversions
 * @param {Object} selection
 * @returns results of conversions
 */
async function get_conversions(selection) {
  // Regular expression to match the numerical part and optional space
  const numSpace_RE = new RegExp(
    /((^[\-−]?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?))\s*/
  );
  let result = '';
  if (/\b\d{1,2}:\d{2}\s*(?:am|pm)?\b/i.test(selection)) {
    result = getAllTimeConversions(selection);
  } else {
    const listOfUnits = await getAllUnits();
    for (const unitObject of listOfUnits) {
      const aliases = unitObject.aliases.sort(descending_length);
      for (let i = 0; i < aliases.length; i++) {
        let measure_RE;
        // Condition to handle PRE_SYMBOLS correctly in our generalized regex expression
        if (PRE_SYMBOLS.has(aliases[i])) {
          const s =
            '((^' +
            '\\' +
            aliases[i] +
            '\\s*[\\-−]?(?:\\d+|\\d{1,3}(?:,\\d{3})+)(?:(\\.|,)\\d+)?))\\s*';
          measure_RE = RegExp(s, 'i');
        } else {
          measure_RE = RegExp(numSpace_RE.source + aliases[i] + '$', 'i');
        }

        //console.log('measure_RE', measure_RE);
        //console.log('selection', selection);
        const matches = selection.match(measure_RE);
        if (matches != null && matches[0] != null) {
          const quantity = matches[1]
            .toLowerCase()
            .replace(aliases[i], '')
            .replaceAll(',', '')
            .replace('−', '-');
          const precision = getPrecision(Number(quantity));

          // const dollar = ['dollars','dollar','USD','$','Can$','C$','CA$','CAD','AU$','A$','AUD'];
          // const yen_yuan = ['CNY', 'Chinese Yuan', 'Yuan', '¥', 'Yen', 'JPY'];
          // if (unitObject.type === 'currency' && (yen_yuan.includes(unitObject.unit) || dollar.includes(unitObject.unit))) {
          //   console.log("qwertyuiopasdfghjk",yen_yuan.includes(unitObject.unit), unitObject.unit)
          //   options = null;
          //   if (dollar.includes(unitObject.unit))
          //     options = ['USD', 'CAD', 'AUD'];
          //   else if (yen_yuan.includes(unitObject.unit))
          //     options = ['JPY', 'CNY'];

          //   if (options !== null) {
          //     const promptMessage = 'Multiple matches found. Please choose one:';
          //     const userChoice = await customPrompt(promptMessage, options);
          //     if (userChoice !== null) {
          //       unitObject.unit = options[userChoice];
          //       console.log('User choice:', options[userChoice]);
          //     } else {
          //       console.log('User cancelled the selection.');
          //     }
          //   }
          // if (dollar.includes(unitObject.unit)) {
          //   const promptMessage = 'Multiple matches found. Please choose one:';
          //   const options = ['USD', 'CAD', 'AUD'];
          //   const userChoice = await customPrompt(promptMessage, options);
          //   if (userChoice !== null) {
          //     unitObject.unit = options[userChoice];
          //     console.log('User choice:', options[userChoice]);
          //   } else {
          //     console.log('User cancelled the selection.');
          //   }
          // }
          // if (yen_yuan.includes(unitObject.unit)) {
          //   const promptMessage = 'Multiple matches found. Please choose one:';
          //   const options = ['JPY', 'CNY'];
          //   const userChoice = await customPrompt(promptMessage, options);
          //   if (userChoice !== null) {
          //     unitObject.unit = options[userChoice];
          //     console.log('User choice:', options[userChoice]);
          //   } else {
          //     console.log('User cancelled the selection.');
          //   }
          // }
          // }

          const conversion_class = get_conversion_class(
            unitObject.type,
            unitObject.unit
          );

          if (unitObject.type == 'currency') {
            const dollar = [
              'dollars',
              'dollar',
              'USD',
              '$',
              'Can$',
              'C$',
              'CA$',
              'CAD',
              'AU$',
              'A$',
              'AUD',
            ];
            const yen_yuan = ['JPY', 'CNY', 'Chinese Yuan', 'Yuan', '¥', 'Yen'];

            console.log(
              'qwertyuiopasdfghjk',
              yen_yuan.includes(unitObject.unit),
              unitObject.unit
            );
            console.log(
              'qwertyuiopasdfghjk',
              dollar.includes(unitObject.unit),
              unitObject.unit
            );
            if (
              yen_yuan.includes(unitObject.unit) ||
              dollar.includes(unitObject.unit)
            ) {
              console.log(
                'qwertyuiopasdfghjk',
                yen_yuan.includes(unitObject.unit),
                unitObject.unit
              );
              var options = [];
              if (dollar.includes(unitObject.unit))
                options = ['USD', 'CAD', 'AUD'];
              else if (yen_yuan.includes(unitObject.unit))
                options = ['CNY', 'JPY'];

              if (options !== null) {
                const promptMessage =
                  'Multiple matches found. Please choose one:';
                const userChoice = await customPrompt(promptMessage, options);
                if (userChoice !== null) {
                  unitObject.unit = options[userChoice];
                  console.log('User choice:', options[userChoice]);
                } else {
                  console.log('User cancelled the selection.');
                  continue;
                }
              }
            }

            const std_conversion =
              await conversion_class.getStandardConversion(quantity);
            result = await conversion_class.getAllConversions(
              Number(std_conversion),
              precision
            );
            return result;
          } else if (unitObject.type == 'temperature') {
            const std_conversion =
              conversion_class.getStandardConversion(quantity);
            result = conversion_class.getAllConversions(
              Number(std_conversion),
              precision
            );
          } else {
            const std_conversion = getStandardConversion(unitObject, quantity);
            result = getAllConversions(
              Number(std_conversion),
              precision,
              unitObject,
              listOfUnits
            );
          }
        }
      }
    }
  }

  return result;
}
