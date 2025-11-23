import { mount } from '@vue/test-utils';
import Comp from '../App.vue';

// Basic render test
test('App renders basic', () => {
  const wrapper = mount(Comp);
  expect(wrapper.exists()).toBe(true);
});

// TODO: add props, events and edge-case tests