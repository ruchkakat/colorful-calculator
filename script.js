class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

// Color Change

const logo = document.querySelector('.logo');
const root = document.documentElement;

const colorSchemes = [
    {
        buttons: '#FF8E71',
        output: '#FFC2B3',
        previous: '#FF8E71',
        current: '#FF481A',
        logo: '#FF8E71'
    },
    {
        buttons: '#92ECC5',
        output: '#D4F7E8',
        previous: '#92ECC5',
        current: '#67E4AE',
        logo: '#92ECC5'
    },
    {
        buttons: '#F38181',
        output: '#F8B9B9',
        previous: '#F38181',
        current: '#ED4545',
        logo: '#F38181'
    },
    {
        buttons: '#46B7B9',
        output: '#C7E9EA',
        previous: '#46B7B9',
        current: '#46B7B9',
        logo: '#46B7B9'
    },
    {
        buttons: '#F5B461',
        output: '#FADDB7',
        previous: '#F5B461',
        current: '#F19927',
        logo: '#F5B461'
    },
    {
        buttons: '#6EB6FF',
        output: '#B3D8FF',
        previous: '#6EB6FF',
        current: '#4CA5FF',
        logo: '#6EB6FF'
    }
];

let currentScheme = 0;

logo.addEventListener('click', () => {
    currentScheme = (currentScheme + 1) % colorSchemes.length;
    const scheme = colorSchemes[currentScheme];
    
    root.style.setProperty('--buttons-bg-color', scheme.buttons);
    root.style.setProperty('--output-bg-color', scheme.output);
    root.style.setProperty('--previous-num-color', scheme.previous);
    root.style.setProperty('--current-num-color', scheme.current);
    root.style.setProperty('--logo-color', scheme.logo);
});