let currentInput = "";
let isResultDisplayed = false;

// Update the screen display
function updateScreen(value) {
    document.getElementById("screen").textContent = value;
}

// Handle digit and decimal point inputs
function inputDigit(digit) {
    if (isResultDisplayed) {
        currentInput = "";
        isResultDisplayed = false;
    }

    if (digit === '.' && currentInput.split(/[\+\-\*\/]/).pop().includes('.')) {
        return; // Prevent multiple decimals in one number
    }

    if (currentInput === "" && digit === "0") return; // Prevent leading zero
    currentInput += digit;
    updateScreen(currentInput);
}

// Handle operator inputs
function inputOperator(operator) {
    if (isResultDisplayed) {
        isResultDisplayed = false; // Allow continued operations after result
    }

    if (currentInput === "" && operator !== '-') {
        return; // Prevent starting with operators except '-'
    }

    if (/[\+\-\*\/]$/.test(currentInput)) {
        return; // Prevent consecutive operators
    }

    currentInput += operator;
    updateScreen(currentInput);
}

// Delete the last character
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateScreen(currentInput || "0");
}

// Reset the calculator
function resetCalculator() {
    currentInput = "";
    updateScreen("0");
}

// Perform the calculation
function calculate() {
    if (/[\+\-\*\/.]$/.test(currentInput)) {
        updateScreen("Error");
        currentInput = "";
        return;
    }

    try {
        let result = eval(currentInput);
        
        // Ensure integers stay as integers
        result = Number.isInteger(result) ? result : parseFloat(result.toFixed(3));
        
        updateScreen(result);
        currentInput = result.toString();
        isResultDisplayed = true;
    } catch (error) {
        updateScreen("Error");
        currentInput = "";
    }
}
