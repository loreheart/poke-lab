import { describe, expect, it, beforeEach } from 'vitest'

import { capitalize, getBigBulbaImg } from '../../helpers'
import { testPokemon, testParadoxPokemon } from '../mocks/pokemon'

describe('Helper Functions', () => {
  beforeEach(() => {

  })

  it('capitalize', () => {
    expect(capitalize('bulbasaur')).toBe('Bulbasaur')
  })

  it('getBigBulbaImg for one word pokemon', () => {
    const imageUrl = getBigBulbaImg(testPokemon)
    expect(imageUrl).not.toContain("bulbasaur")
    expect(imageUrl).toContain("Bulbasaur")
  })

  it('getBigBulbaImg for two word pokemon', () => {
    const imageUrl = getBigBulbaImg(testParadoxPokemon)
    expect(imageUrl).toContain("Raging")
    expect(imageUrl).toContain("Bolt")
    expect(imageUrl).not.toContain("bolt")
  })

})