<div align="center">

# Smart Units Converter - Browser Extension
  
An extension that converts your selected values into popular units. Save time, make life easier :dancer:

[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![GitHub issues](https://img.shields.io/github/issues/SE-Fall-2024/units_converter_extension)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/SE-Fall-2024/units_converter_extension)](https://github.com/SE-Fall-2024/units_converter_extension/pulls)
[![GitHub contributors](https://img.shields.io/github/contributors/SE-Fall-2024/units_converter_extension)](https://github.com/SE-Fall-2024/units_converter_extension/graphs/contributors)
[![GitHub Actions Build Status](https://github.com/SE-Fall-2024/units_converter_extension/actions/workflows/tests-coverage.yml/badge.svg?branch=master)](https://github.com/SE-Fall-2024/units_converter_extension/actions/workflows/tests-coverage.yml)
[![Coverage Status](https://coveralls.io/repos/github/SE-Fall-2024/units_converter_extension/badge.svg?branch=master)](https://coveralls.io/github/SE-Fall-2024/units_converter_extension?branch=master)
[![Code Style: ESLint](https://img.shields.io/badge/ESLint-purple.svg)](https://eslint.org/)
[![Code Formatting: Prettier](https://img.shields.io/badge/Prettier-yellow.svg)](https://prettier.io/)  
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.14224806.svg)](https://doi.org/10.5281/zenodo.14224806)

**Video demo below:**

[![Alt text](https://i.ytimg.com/vi/W4USPH2sBJw/hqdefault.jpg)](https://drive.google.com/file/d/1km0OGBB_oV7Z7ynN50SRSraJ6Tim_L1T/view?usp=sharing)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![CSS](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
</div>

## Use Cases
Say goodbye to the hassle of manual conversions! Our Chrome extension instantly converts any highlighted unit, from currency to scientific measurements, directly on your page—no extra steps needed. With a sleek interface and light/dark modes, you can effortlessly access a comprehensive converter, create custom units, and even track historical exchange rates for currencies. Save time, skip the searches, and make every conversion in a single click.

- Convert $ to ¥ when you are shopping abroad
- Convert kilometers to miles when you are planning routes before driving
- Convert kilograms to pounds when you are buying food
- Convert celcius to fahrenheit when you are talking about weather
- Convert hours to seconds when you are calculating time
- Convert celcius to Fahrenheit when you are calculating temperature
- Convert Mb/s to b/s when you are calculating internet speed
- Convert square meter to square feet when you are calculating the measure of area
- Convert litres to gallons when you are calculating the volume for liquid items online
- Convert TB to GB when you are buying data storage devices
- Convert Time from a given time zone to another (PST to EST)
- If you are a scientist: convert easily between units of scientific measurement like radians, joules, hertz, and more!

## Installation Guide

For detailed installation instructions, please refer to the [INSTALL.md](./INSTALL.md) file.

## Our features:
Once the user has installed our extension, all they have to do is click on the extension icon in the top right corner where the user further finds and selects the extension "Unit Convert Selection":

### 1. Direct conversions
- This feature allows the user to directly convert units without the need to select any particular text on the browser. This helps save trouble and effort for the user!
- The user selects the conversion they require from the given standard conversions and convert any unit to the required unit without any restrictions. This direct method allows the user to be quick.
  
<p align="center">
  <img src="https://github.com/shyamal31/units_converter_extension/assets/85347670/a7085ef1-c7b0-412a-ac68-9be2a1c479a6" height="300" style="vertical-align: top;"/>
  <img src="https://github.com/shyamal31/units_converter_extension/assets/85347670/5975dd5f-73e0-4dd6-ad1c-f63c34a79bd9" height="300" style="vertical-align: top;"/>
</p>

### 2. Customized Conversions

- This feature allows the user to create his own customized unit conversion for his personal use and purposes. This includes all the conversion that are not standard but used as a jargon by people. Here, the user added a custom unit 1 meter = 3 subs, and it is visible in the popup:

<p align="center">
  <img src="https://github.com/shyamal31/units_converter_extension/assets/85347670/1be09981-8e21-4dde-9a39-2571fbb5468e" height="300" style="vertical-align: top;"/>
  <img src="https://github.com/shyamal31/units_converter_extension/assets/85347670/681416b3-a41d-4dcf-b864-7eca0303b7e8" height="300" style="vertical-align: top;"/>
</p>
  
- These custom units can be deleted as well:

<p align="center">
  <img src="https://github.com/shyamal31/units_converter_extension/assets/85347670/7e074d75-a02d-4f58-98a3-acd3fa4fceae" width="400" style="vertical-align: top;"/>
</p>
   
### 3. Favorites 
- This feature allows users to select a particular conversion unit and place it in favorites as the units in favorites are shown at the top. This feature is useful when the user wastes time in finding his desired converted unit from a pool of large units.
- Here we select pint and gallon as favorites in volume converions so now all the volume conversions will have pint and gallon at the top of the display!

<p align="center">
  <img src="https://github.com/shyamal31/units_converter_extension/assets/85347670/e5b4c8e1-bdfc-466a-9675-4a6e077bc225" height="300" style="vertical-align: top;"/>
  <img src="https://github.com/shyamal31/units_converter_extension/assets/85347670/4e54e867-9889-41ec-b0ea-e0783e74467c" height="300" style="vertical-align: top;"/>
</p>

### 4. View Historical Exchange Rates
- The View Historical Exchange Rates feature lets users check past exchange rates between two currencies for a specific date. This is ideal for analyzing currency trends, making historical financial calculations, or referencing past rates for transactions and reports.
<img width="460" alt="Screenshot 2024-11-01 at 8 19 15 PM" src="https://github.com/user-attachments/assets/c893ec33-1385-4638-97ad-6e1ecc86f527">
<img width="460" alt="Screenshot 2024-11-01 at 8 20 03 PM" src="https://github.com/user-attachments/assets/936daf2b-d15a-4c05-bd56-357bee249125">



### 5. Switch Themes
- The unit converter has a light and dark theme, which can be switched between using the simple toggle switch !

<p align="center">
  <img src="https://github.com/ncsuswe24/units_converter_extension/blob/f9d6634df01b34b22038c958b95e2a6a9caf162f/assets/Images/light-theme.png" height="300" style="vertical-align: top;"/>
  <img src="https://github.com/ncsuswe24/units_converter_extension/blob/f9d6634df01b34b22038c958b95e2a6a9caf162f/assets/Images/dark-theme.png" height="300" style="vertical-align: top;"/>
</p>

## IDE and Code Fomatter

- IDE and Style Checker: [VSCode](https://code.visualstudio.com/)

- Code Style Formatter: [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)

- Code Syntax Checker : [Eslint](https://https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Vscode plugin.

VS Code uses js-beautify internally, but it lacks the ability to modify the style you wish to use. This extension enables running js-beautify in VS Code, AND honouring any .jsbeautifyrc file in the open file's path tree to load your code styling. Run with F1 Beautify (to beautify a selection) or F1 Beautify file.


## Run Test cases and coverage

 ### [Test Cases Guide](https://github.com/shyamal31/units_converter_extension/tree/master/docs/test_doc)

 ### Unit Test
  
  - Test cases have been tested using [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).
    
  #### Setup
  
  From the repository root, run:
  
  ```
    npm install --save-dev mocha chai
  ```

Then run:
  ```
    npm test [filename]
    
  ```
npm will then attempt to run all test files that end with `*.test.js` if you do not specify the filename.

### Code Coverage
  
  - [Istanbul](https://istanbul.js.org/) and [Coveralls](https://coveralls.io/)

## Documentation

Check out our [Wiki](https://github.com/ncsuswe24/units_converter_extension/wiki/Documentation) !


## Funding
The project is not currently funded.


## Troubleshooting
If you encounter any issues during any stage of extension use or you encounter any development-related issues, feel free to reach out to our contact our support team at [unit.convertor.help@gmail.com](mailto:unit.convertor.help@gmail.com).


# Contributors
  <table>
  <tr>
    <td align="center"><a href="https://github.com/MiaAmeen"><img src="https://avatars.githubusercontent.com/u/59318487?v=4" width="100px;" alt=""/><br /><sub><b>Mia Ameen</b></sub></a></td>
    <td align="center"><a href="https://github.com/lakhanij"><img src="https://avatars.githubusercontent.com/u/164538484?v=4" width="100px;" alt=""/><br /><sub><b>Jay Lakhani</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/Vaibhav260"><img src="https://avatars.githubusercontent.com/u/90965132?v=4" width="100px;" alt=""/><br /><sub><b>Vaibhav Hawaldar</b></sub></a><br /></td>
  </tr>
</table>

## Iteration 3:
<table>
  <tr>
    <td align="center"><a href="https://github.com/nrcase"><img src="https://avatars.githubusercontent.com/nrcase" width="100px;" alt=""><br><b>Nick Case</b></a></td>
    <td align="center"><br><a href="https://github.com/hannahestes"><img src="https://avatars.githubusercontent.com/hannahestes" width="100px;" alt=""><br><b>Hannah Estes</b></a><br><a href="https://github.com/hannahe6"><b>(second account)</b></a></td>
    <td align="center"><a href="https://github.com/satwikakancharla"><img src="https://avatars.githubusercontent.com/satwikakancharla" width="100px;" alt=""><br><b>Satwika Kancharla</b></a></td>
  </tr>
</table>
