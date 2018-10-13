import faker from 'faker';

function padToTwo(numberString) {
  if (numberString.length < 2) {
    numberString = '0' + numberString;
  }
  return numberString;
}

export function hexAverage() {
  var args = Array.prototype.slice.call(arguments);
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
