import { mount } from '@vue/test-utils'

import AppHome from "../components/AppHome.vue"

import { expect, it } from "vitest"

const wrapper = mount(AppHome);

it("testing AppHome component", async () => {
  expect(wrapper.text()).toContain("PokeLab Home");
});
