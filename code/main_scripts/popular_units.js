/*
    POPULAR UNITS is a map that stores all the popular units for each unit type
    Example : The some popular units for length type are : meters, kilometers, miles
*/
/**
 * @constant
 * @type {Array}
 */
const POPULAR_UNITS = {
 length: ['miles', 'meters', 'kilometers', 'yard', 'feet', 'furlong', 'chain', 'centimeters', 'millimeters', 'inch', 'nautical mile', 'micrometer', 'nanometer'], 
 mass: [
    'kilograms', 
    'pounds', 
    'ounces', 
    'grams', 
    'tonnes', 
    'milligrams', 
    'micrograms',
    'imperial ton', 
    'us ton',       
    'stone'         
  ],  
  temperature: ['celcius', 'fahrenheit', 'kelvin'],
  currency: ['usd', 'eur', 'gbp', 'inr', 'jpy', 'cad', 'aud', 'chf', 'cny'],
  time: ['seconds', 'minutes', 'hours', 'days', 'weeks', 'milliseconds', 'microseconds', 'nanoseconds'], 
  dataTransfer: [
    'b/s',        
    'Kb/s',         
    'Kib/s',       
    'Mb/s',        
    'Mib/s',      
    'Gb/s',       
    'Gib/s',      
    'Tb/s',        
    'Tib/s',      
    'KB/s',      
    'MB/s',      
    'GB/s',       
    'TB/s'         
  ],  
  area: ['km2', 'miles2', 'ft2', 'ha2', 'acre2', 'yd2', 'm2', 'in2', 'cm2'],
  speed: ['Km/h', 'mph', 'm/s'],
  volume: ['litres', 'milliliter', 'cubic meter', 'cubic inch', 'cubic foot', 'pint', 'quart', 'gallon', 'fl oz', 'cup', 'tablespoon', 'teaspoon'], 
  data: ['MB', 'GB', 'TB', 'B', 'KB'],
  energy: [
    'joule',
    'kilojoule',
    'gram calorie',
    'kilocalorie',
    'watt hour',
    'kilowatt hour',
    'electronvolt',
    'british thermal unit',
    'us therm',
    'foot-pound'
  ],
  frequency: [
    'hertz',
    'kilohertz',
    'megahertz',
    'gigahertz'
  ],
  angle: [
    'degree',
    'arcsecond',
    'gradian',
    'milliradian',
    'minute of arc',
    'radian'
  ]
};


const PRE_SYMBOLS = new Set([
  '$',
  '₹',
  '€',
  '£',
  '¥',
  'Can$',
  'C$',
  'CA$',
  'A$',
  'AU$',
  '¥',
]);
