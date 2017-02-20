$(document).ready(function() {
  'use strict';

  var evaluateScreen = function(scrnArray) {
    const opArray = ['+', '-', '÷', 'x', '='];
    let usedOperands = [];
    let numberArray = [];
    let currentNumber = '';

    for (let i = 0; i < scrnArray.length; i++) {
      if (opArray.includes(scrnArray[i])) {
        // check to see if this is the first thing inputed or
        // the previous character is also a operand if so returns ERROR
        if (i === 0 || opArray.includes(scrnArray[i - 1])) {
          return 'ERROR';
        }
        else if (scrnArray[i] === '=') {
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

    let currentAnswer = parseInt(numberArray[0]);

    for (let i = 0; i < usedOperands.length; i++) {
      switch (usedOperands[i]) {
        case '+':
          currentAnswer += parseInt(numberArray[i + 1]);
          break;
        case '-':
          currentAnswer -= parseInt(numberArray[i + 1]);
          break;
        case 'x':
          currentAnswer *= parseInt(numberArray[i + 1]);
          break;
        case '÷':
          if (numberArray[i + 1] == 0) {
            return 'ERROR';
          }
          currentAnswer /= parseInt(numberArray[i + 1]);
          break;
        default:
          return 'ERROR';
      }

      return currentAnswer;
    }
  };
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
      screen.text(answer);
    }
    screen.text(answer);
  });
});
