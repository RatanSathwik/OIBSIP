let input = '';
let resultShown = false;

const inputDiv = document.getElementById('input');
const resultDiv = document.getElementById('result');

function updateDisplay() {
  inputDiv.textContent = input || '0';
}

function appendValue(value) {
  if (resultShown && !['+', '-', '*', '/', '%'].includes(value)) {
    input = '';
    resultShown = false;
  }
  input += value;
  updateDisplay();
}

function clearAll() {
  input = '';
  resultDiv.textContent = '';
  updateDisplay();
}

function backspace() {
  input = input.slice(0, -1);
  updateDisplay();
}

function calculateResult() {
  try {
    let computedInput = input.replace(/%/g, '/100');
    let result = eval(computedInput);
    resultDiv.textContent = result;
    resultShown = true;
  } catch {
    resultDiv.textContent = 'Error';
    resultShown = true;
  }
}

function squareRoot() {
  // Apply square root to the last number in input
  const lastNumberMatch = input.match(/(\d+\.?\d*)$/);
  if (lastNumberMatch) {
    const lastNumber = lastNumberMatch[1];
    const sqrtValue = Math.sqrt(Number(lastNumber));
    input = input.replace(/(\d+\.?\d*)$/, sqrtValue);
    updateDisplay();
  }
}
updateDisplay();
