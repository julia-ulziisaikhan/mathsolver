// popup.js

document.getElementById('solve-captcha').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: findAndSolveCaptcha
    }, (results) => {
      if (results && results[0] && results[0].result) {
        document.getElementById('status').innerText = 'CAPTCHA solved!';
      } else {
        document.getElementById('status').innerText = 'Failed to solve CAPTCHA.';
      }
    });
  });
});

function findAndSolveCaptcha() {
  // Same function as in content.js
  function solveCaptcha(equation) {
    try {
      const answer = eval(equation);
      console.log('Solved CAPTCHA:', equation, '=', answer);
      return answer;
    } catch (e) {
      console.error('Error solving CAPTCHA:', e);
      return null;
    }
  }

  function findAndSolveCaptcha() {
    console.log('Attempting to find CAPTCHA elements...');
    
    const captchaElement = document.querySelector('p.form-group');
    const captchaInput = document.querySelector('input[data-testid="answer_input"]');

    if (captchaElement && captchaInput) {
      console.log('CAPTCHA elements found:', captchaElement, captchaInput);
      
      const equation = captchaElement.innerText || captchaElement.textContent;
      console.log('CAPTCHA equation:', equation);
      
      const answer = solveCaptcha(equation.replace('=', '').trim());
      if (answer !== null) {
        captchaInput.value = answer;
        console.log('CAPTCHA answer entered:', answer);
        return true;
      } else {
        console.log('Failed to solve CAPTCHA.');
        return false;
      }
    } else {
      console.log('CAPTCHA elements not found.');
      return false;
    }
  }

  return findAndSolveCaptcha();
}
