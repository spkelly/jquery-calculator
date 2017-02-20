$(document).ready(function() {
  var evaluateScreen = function(scrnArray) {
    const opArray = ['+', '-', '÷', 'x', '='];
    let usedOperands = [];
    let numberArray = [];
    let currentNumber = 0;

    for (let i = 0; i < scrnArray.length; i++) {
      if (opArray.includes(scrnArray[i])) {
        // check to see if this is the first thing inputed or
        // the previous character is also a operand if so returns ERROR
        if (i === 0 || opArray.includes(scrnArray[i - 1])) {
          return 'ERROR';
        }
        else if (scrnArray[i] === '=') {
          if (i === 1) {
            return currentNumber;
          }
          numberArray.push(currentNumber);
          break;
        }
        else {
          usedOperands.push(scrnArray[i]);
          numberArray.push(currentNumber);
          currentNumber = '';
        }
      }
      else {
        currentNumber += scrnArray[i];
      }
    }

    let currentAnswer = parseFloat(numberArray[0]);

    // check if no other operands where used besides equals sign
    for (let i = 0; i < usedOperands.length; i++) {
      let nextDigit = numberArray[i + 1];

      switch (usedOperands[i]) {
        case '+':
          currentAnswer += parseFloat(nextDigit);
          break;
        case '-':
          currentAnswer -= parseFloat(nextDigit);
          break;
        case 'x':
          currentAnswer *= parseFloat(nextDigit);
          break;
        case '÷':
          if (nextDigit === '0') {
            return 'ERROR';
          }
          currentAnswer /= parseFloat(nextDigit);
          break;
        default:
          return 'ERROR';
      }
    }

    return currentAnswer;
  };

  // declaring variables
  const screen = $('#screen');
  const equalButton = $('#equals');
  const clearButton = $('#clear');
  const buttons = $('.buttons').children();

  let screenLock = false;
  let answer = '';
  let screenArray = [];

  buttons.click(function(e) {
    if (!screenLock) {
      screen.append($(e.target).text());

      // pushing the inputed putton into the screen array
      screenArray.push($(e.target).text());
    }
  });

  clearButton.click(function() {
    screen.empty();
    screenLock = false;
    screenArray = [];
  });

  equalButton.click(function() {
    if (screenArray.length === 0) {
      screenLock = true;
      screen.text('ERROR');
    }
    answer = evaluateScreen(screenArray);
    if (answer === 'ERROR') {
      screenLock = true;
      screenArray = [];
      screenArray.push(answer);
      screen.text(answer);
    }
    screen.text(answer);
    screenArray = [];
    screenArray.push(answer);
  });
});
