const { normalizeInput, convertValue } = require('./utils');

function jsonToToon(input) {
  const normalized = normalizeInput(input);
  return convertValue(normalized, 0).trimEnd();
}

module.exports = {
  jsonToToon,
};
