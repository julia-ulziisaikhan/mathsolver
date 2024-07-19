// content.js

// Function to solve the math equation without using eval
function solveCaptcha(equation) {
    const match = equation.match(/(\d+)\s*([+\-*\/])\s*(\d+)/);
    if (!match) {
      console.error('Error parsing CAPTCHA equation:', equation);
      return null;
    }
  
    const num1 = parseInt(match[1], 10);
    const operator = match[2];
    const num2 = parseInt(match[3], 10);
  
    let result;
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      default:
        console.error('Unknown operator in CAPTCHA equation:', operator);
        return null;
    }
  
    console.log('Solved CAPTCHA:', equation, '=', result);
    return result;
  }
  
  // Function to find and solve the CAPTCHA
  function findAndSolveCaptcha() {
    console.log('Attempting to find CAPTCHA elements...');
  
    // Debugging specific parts of the path
    const modal = document.querySelector('div.modal.fade.concurrent-sessions-modal.in');
    console.log('Checking modal:', modal);
  
    if (modal) {
      const modalDialog = modal.querySelector('div.modal-dialog');
      console.log('Checking modal-dialog:', modalDialog);
  
      if (modalDialog) {
        const modalContent = modalDialog.querySelector('div.modal-content');
        console.log('Checking modal-content:', modalContent);
  
        if (modalContent) {
          const modalFooter = modalContent.querySelector('div.modal-footer');
          console.log('Checking modal-footer:', modalFooter);
  
          if (modalFooter) {
            const formInline = modalFooter.querySelector('div.form-inline');
            console.log('Checking form-inline:', formInline);
  
            if (formInline) {
              const formGroup = formInline.querySelector('p.form-group');
              console.log('Checking form-group:', formGroup);
  
              if (formGroup) {
                const captchaElement = formGroup;
                // Adjusting the input field selector to ensure we capture it
                const captchaInput = formGroup.querySelector('input[type="tel"][data-testid="answer_input"]') || document.querySelector('input[type="tel"].form-control');
  
                console.log('CAPTCHA input:', captchaInput);
  
                if (captchaElement && captchaInput) {
                  console.log('CAPTCHA elements found:', captchaElement, captchaInput);
  
                  const equation = captchaElement.innerText || captchaElement.textContent;
                  console.log('CAPTCHA equation:', equation);
  
                  const answer = solveCaptcha(equation.replace('=', '').trim());
                  if (answer !== null) {
                    captchaInput.value = answer;
                    console.log('CAPTCHA answer entered:', answer);
  
                    // Simulate events to trigger form submission
                    captchaInput.dispatchEvent(new Event('input', { bubbles: true }));
                    captchaInput.dispatchEvent(new Event('change', { bubbles: true }));
  
                    // Simulate pressing the Enter key
                    const enterEvent = new KeyboardEvent('keydown', {
                      bubbles: true,
                      cancelable: true,
                      keyCode: 13
                    });
                    captchaInput.dispatchEvent(enterEvent);
  
                    console.log('CAPTCHA form submission triggered.');
                  } else {
                    console.log('Failed to solve CAPTCHA.');
                  }
                } else {
                  console.log('CAPTCHA elements not found.');
                }
              } else {
                console.log('form-group element not found.');
              }
            } else {
              console.log('form-inline element not found.');
            }
          } else {
            console.log('modal-footer element not found.');
          }
        } else {
          console.log('modal-content element not found.');
        }
      } else {
        console.log('modal-dialog element not found.');
      }
    } else {
      console.log('modal element not found.');
    }
  }
  
  // Run the function to find and solve CAPTCHA immediately
  findAndSolveCaptcha();
  
  // Set up a MutationObserver to watch for changes and solve the CAPTCHA if it appears
  const observer = new MutationObserver(() => {
    findAndSolveCaptcha();
  });
  
  // Start observing the document for changes
  observer.observe(document.body, { childList: true, subtree: true });
  