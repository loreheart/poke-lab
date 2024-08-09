import { mount } from '@vue/test-utils'

import Pokedex from "../components/Pokedex.vue"

import { expect, it } from "vitest"

const wrapper = mount(Pokedex);

it("testing Pokedex component", async () => {
  expect(wrapper.text()).toContain("Pokedex");
});
