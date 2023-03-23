// Checks if an input string is true or false. If so, it returns boolean true or boolean false. If is not "true" or "false", return null. If input is undefined, return undefined.
const trueFalse = (input) => {
  if (input === undefined) {
    return undefined;
  }
  input = input.toLowerCase();
  if (input === "true") {
    return true;
  } else if (input === "false") {
    return false;
  } else {
    return null;
  }
};

module.exports = trueFalse;
