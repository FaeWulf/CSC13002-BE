function str(column) {
  return {
    name: column,
    skip: c => {
      return c.value === undefined
    }
  };
}

function int(column) {
  return {
    name: column,
    skip: c => c.value === undefined,
    init: c => +c.value
  };
}

module.exports = { str, int }
