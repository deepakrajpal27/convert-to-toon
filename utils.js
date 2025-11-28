const INDENT_SIZE = 2;

function normalizeInput(input) {
  if (typeof input === 'string') {
    return parseJsonString(input);
  }

  if (input === undefined) {
    throw new Error('Input must be a valid JSON value. Received undefined.');
  }

  return ensureSerializable(input);
}

function parseJsonString(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error('Input string is not valid JSON.');
  }
}

function ensureSerializable(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    throw new Error('Input value cannot be represented as JSON.');
  }
}

function convertValue(value, indentLevel = 0) {
  if (Array.isArray(value)) {
    return convertArray(value, indentLevel);
  }

  if (isPlainObject(value)) {
    return convertObject(value, indentLevel);
  }

  return formatPrimitive(value, indentLevel);
}

function convertObject(obj, indentLevel) {
  const indent = createIndent(indentLevel);
  const entries = Object.keys(obj);

  if (entries.length === 0) {
    return `${indent}{}`;
  }

  const lines = entries.map((key) => {
    const value = obj[key];
    const keyLine = `${indent}${key}:`;

    if (isComplex(value)) {
      const nested = convertValue(value, indentLevel + 1);
      return `${keyLine}\n${nested}`;
    }

    return `${keyLine} ${stringifyPrimitive(value)}`;
  });

  return lines.join('\n');
}

function convertArray(items, indentLevel) {
  const indent = createIndent(indentLevel);

  if (items.length === 0) {
    return `${indent}[]`;
  }

  const lines = items.map((item) => {
    if (isComplex(item)) {
      const nested = convertValue(item, indentLevel + 1);
      return `${indent}-\n${nested}`;
    }

    return `${indent}- ${stringifyPrimitive(item)}`;
  });

  return lines.join('\n');
}

function formatPrimitive(value, indentLevel) {
  const indent = createIndent(indentLevel);
  return `${indent}${stringifyPrimitive(value)}`;
}

function stringifyPrimitive(value) {
  if (value === null) {
    return 'null';
  }

  const type = typeof value;

  if (type === 'string') {
    return `"${escapeString(value)}"`;
  }

  if (type === 'number') {
    if (!Number.isFinite(value)) {
      throw new Error('Numbers must be finite to be represented in TOON format.');
    }
    return String(value);
  }

  if (type === 'boolean') {
    return value ? 'true' : 'false';
  }

  throw new Error(`Unsupported primitive type: ${type}`);
}

function escapeString(value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

function createIndent(level) {
  return ' '.repeat(level * INDENT_SIZE);
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isComplex(value) {
  return Array.isArray(value) || isPlainObject(value);
}

module.exports = {
  normalizeInput,
  convertValue,
};
