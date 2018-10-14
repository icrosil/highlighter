import faker from 'faker';

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

function padToTwo(numberString) {
  if (numberString.length < 2) {
    numberString = '0' + numberString;
  }
  return numberString;
}

export function invertColor(hex) {
  if (!hex) return;
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

export function hexAverage() {
  var args = Array.prototype.slice.call(arguments);
  if (!args.length) return null;
  return args
    .reduce(
      function(previousValue, currentValue) {
        return currentValue
          .replace(/^#/, '')
          .match(/.{2}/g)
          .map(function(value, index) {
            return previousValue[index] + parseInt(value, 16);
          });
      },
      [0, 0, 0],
    )
    .reduce(function(previousValue, currentValue) {
      return (
        previousValue +
        padToTwo(Math.floor(currentValue / args.length).toString(16))
      );
    }, '#');
}

export function getRandomColor() {
  return faker.internet.color();
}
