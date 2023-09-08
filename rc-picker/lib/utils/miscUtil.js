"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeValue = executeValue;
exports.getValue = getValue;
exports.leftPad = leftPad;
exports.toArray = toArray;
exports.tuple = void 0;
exports.updateValues = updateValues;
function leftPad(str, length) {
  var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
  var current = String(str);
  while (current.length < length) {
    current = "".concat(fill).concat(str);
  }
  return current;
}
var tuple = function tuple() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args;
};
exports.tuple = tuple;
function toArray(val) {
  if (val === null || val === undefined) {
    return [];
  }
  return Array.isArray(val) ? val : [val];
}
function getValue(values, index) {
  return values ? values[index] : null;
}
function updateValues(values, value, index) {
  var newValues = [getValue(values, 0), getValue(values, 1)];
  newValues[index] = typeof value === 'function' ? value(newValues[index]) : value;
  if (!newValues[0] && !newValues[1]) {
    return null;
  }
  return newValues;
}
function executeValue(value) {
  return typeof value === 'function' ? value() : value;
}