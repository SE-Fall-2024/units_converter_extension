### Step 1: Clone [this](https://github.com/shyamal31/units_converter_extension) Repository

```
git clone [repository_url]

```
### Step 2: Go to chrome extensions
  
- In the chrome browser open
  
  ```
  chrome://extensions/
  ```
### Step 3: Enable developer settings
- Enable developer settings if it is not enabled

  ![image](https://github.com/shyamal31/units_converter_extension/assets/85347670/1dc7c2ee-cbaa-4308-a3dd-937062d035e8)

### Step 4: Unpack the cloned repository
- Choose Load Unpacked
- Select the repository folder that was cloned in the first step

  ![image](https://github.com/shyamal31/units_converter_extension/assets/85347670/6b1264db-9a24-4846-8c19-e1e925582e1c)

### Step 5: Check the extension added
- The extension will now be added to the Chrome

![image](https://github.com/shyamal31/units_converter_extension/assets/85347670/d8364664-7236-42ee-aa27-ada0c4ce3fcf)

### Step 6: Test the extension
- Displays the most relevant converted unit first
  
![image](https://github.com/shyamal31/units_converter_extension/assets/85347670/a3593a02-0882-4af6-92ba-89192e824de2)


## TO ACTIVATE HISTORICAL EXCHANGE RATES:

### Step 1: Retrieve API Key
1. Go to [exchangerate.host](https://exchangerate.host/)
2. Sign Up: Create a free account by clicking on Sign Up and filling out the required information.
3. Generate API Key: After logging in, navigate to the API Keys section in your account dashboard.
4. Copy the API Key: Generate a new API key and copy it for later use.

### Step 2: Create and Configure Config.js
1. Locate the Example File: In the root directory of the project, find the file named Config.js.example.
2. Create Config.js: Make a copy of this file and rename it to Config.js in the same directory.
3. Insert Your API Key: Replace the placeholder "YOUR_API_KEY_HERE" with the API key you obtained.

Important: Do not commit Config.js to any public repository, as it contains your personal API key.

### Step 3: Refresh the extension
1. Reload the Extension
2. Restart Chrome or Reload the Extension: After setting up Config.js, reload the extension in Chrome to apply the changes.
3. Test Functionality: Use the currency conversion feature to ensure everything is working correctly.
