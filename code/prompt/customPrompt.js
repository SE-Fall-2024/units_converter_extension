function customPrompt(message, options) {
  return new Promise((resolve) => {
    // Create a container for the prompt overlay
    const promptContainer = document.createElement('div');
    promptContainer.id = 'customPromptContainer';
    Object.assign(promptContainer.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '9999', // on top
      userSelect: 'none', // no text selection
    });

    // Prevent event bubbling, because otherwise will keep making copies of the prompt, doing any actions will not re-trigger
    // the methods that called it
    promptContainer.addEventListener('mousedown', (event) => {
      event.stopPropagation();
    });
    promptContainer.addEventListener('mouseup', (event) => {
      event.stopPropagation();
    });
    promptContainer.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    // Create the all of the elements
    const promptBox = document.createElement('div');
    promptBox.id = 'customPrompt';
    Object.assign(promptBox.style, {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '400px',
      width: '80%',
      boxSizing: 'border-box',
      textAlign: 'center',
    });

    const promptMessage = document.createElement('p');
    promptMessage.id = 'promptMessage';
    promptMessage.textContent = message;
    promptMessage.style.marginBottom = '15px';

    const promptSelect = document.createElement('select');
    promptSelect.id = 'promptSelect';
    promptSelect.style.width = '100%';
    promptSelect.style.padding = '8px';
    promptSelect.style.marginBottom = '15px';

    options.forEach((option, index) => {
      const opt = document.createElement('option');
      opt.value = index;
      opt.textContent = option;
      promptSelect.appendChild(opt);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'space-between';

    const submitButton = document.createElement('button');
    submitButton.id = 'promptSubmit';
    submitButton.textContent = 'OK';
    Object.assign(submitButton.style, {
      padding: '10px 20px',
      marginRight: '10px',
      flex: '1',
    });

    const cancelButton = document.createElement('button');
    cancelButton.id = 'promptCancel';
    cancelButton.textContent = 'Cancel';
    Object.assign(cancelButton.style, {
      padding: '10px 20px',
      flex: '1',
    });

    // Append elements to the prompt box
    promptBox.appendChild(promptMessage);
    promptBox.appendChild(promptSelect);
    buttonContainer.appendChild(submitButton);
    buttonContainer.appendChild(cancelButton);
    promptBox.appendChild(buttonContainer);

    // Append the prompt box to the container
    promptContainer.appendChild(promptBox);

    // Append the container to the body
    document.body.appendChild(promptContainer);

    submitButton.onclick = () => {
      const selectedValue = parseInt(promptSelect.value, 10);
      document.body.removeChild(promptContainer);
      resolve(selectedValue); //get the answer and parse as int to be able to get the index of the selected option
    };

    cancelButton.onclick = () => {
      document.body.removeChild(promptContainer);
      resolve(null);
    };
  });
}
