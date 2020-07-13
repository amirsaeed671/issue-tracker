const {add} = require('../utils/helpers')

test('it should add correctly', () => {
  const number = add(1, 2)
  expect(number).toEqual(3)
})
