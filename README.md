# json-to-toon

Convert JSON data into the structured, human-friendly **TOON** format.

## TOON format

TOON is a lightweight text representation for key-value data.

- Objects use `key: value` pairs with indentation to show nesting.
- Arrays use `- item` entries, aligned with their parent indentation.
- Strings are wrapped in double quotes.
- Numbers, booleans, and `null` are written as-is.
- Indentation increases by two spaces for each nested level.

Example:

```
name: "John"
age: 30
skills:
  - "JavaScript"
  - "React"
address:
  city: "Berlin"
  zip: 10117
```

## Installation

```bash
npm install json-to-toon
```

## Usage

```js
const { jsonToToon } = require('json-to-toon');

const input = {
  name: 'John',
  age: 30,
  skills: ['JavaScript', 'React'],
  address: { city: 'Berlin', zip: 10117 },
};

const toon = jsonToToon(input);
console.log(toon);
```

Output:

```
name: "John"
age: 30
skills:
  - "JavaScript"
  - "React"
address:
  city: "Berlin"
  zip: 10117
```

### Converting from JSON strings

You can also pass a JSON string directly. It will be parsed and validated before conversion:

```js
const raw = '{"project":"json-to-toon","stable":true,"tags":["format","json"]}';
const toon = jsonToToon(raw);

console.log(toon);
```

```
project: "json-to-toon"
stable: true
tags:
  - "format"
  - "json"
```

## API

### `jsonToToon(input: any): string`

- Accepts a JavaScript value or JSON string.
- Validates that the value can be represented as JSON.
- Returns a TOON-formatted string.
- Throws an error for invalid JSON input, unsupported types, or non-finite numbers.
