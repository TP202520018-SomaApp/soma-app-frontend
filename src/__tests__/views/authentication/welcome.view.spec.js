import { mount } from '@vue/test-utils';
import Comp from '../../../views/authentication/welcome.view.vue';

// Basic render test
test('welcome.view renders basic', () => {
  const wrapper = mount(Comp);
  expect(wrapper.exists()).toBe(true);
});

// TODO: add props, events and edge-case tests