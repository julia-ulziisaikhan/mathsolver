// Solve CAPTCHA without eval
function solveCaptcha(equation) {
  const match = equation.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
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

function findAndSolveCaptcha() {
  console.log('Attempting to find CAPTCHA elements...');

  const modal = document.querySelector('div.modal.fade.concurrent-sessions-modal.in');
  console.log('Checking modal:', modal);

  if (modal) {
      const formGroup = modal.querySelector('p.form-group');
      console.log('Checking form-group:', formGroup);

      if (formGroup) {
          let equation = '';
          formGroup.childNodes.forEach(node => {
              equation += node.textContent.trim();
          });

          console.log('CAPTCHA equation:', equation);

          const captchaInput = formGroup.querySelector('input[type="tel"][data-testid="answer_input"]') || document.querySelector('input[type="tel"].form-control');
          if (captchaInput) {
              const answer = solveCaptcha(equation.replace('=', '').trim());
              if (answer !== null) {
                  captchaInput.value = answer;
                  captchaInput.focus();
                  captchaInput.blur();
                  captchaInput.dispatchEvent(new Event('input', { bubbles: true }));
                  captchaInput.dispatchEvent(new Event('change', { bubbles: true }));

                  console.log('CAPTCHA answer entered and form submission triggered.');
              } else {
                  console.log('Failed to solve CAPTCHA.');
              }
          } else {
              console.log('CAPTCHA input element not found.');
          }
      } else {
          console.log('form-group element not found.');
      }
  } else {
      console.log('modal element not found.');
  }
}

// Run immediately
findAndSolveCaptcha();

// Observe changes
const observer = new MutationObserver(findAndSolveCaptcha);
observer.observe(document.body, { childList: true, subtree: true });
