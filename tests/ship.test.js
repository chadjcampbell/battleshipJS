import { Ship } from '../src/ship'

//This tests the Ship hit method and isSunk boolean
test('Will the ship float and sink?', () => {
  const testShip = new Ship(3)
  expect(testShip.isSunk()).toBe(false)
  testShip.hit()
  testShip.hit()
  testShip.hit()
  expect(testShip.isSunk()).toBe(true)
})
