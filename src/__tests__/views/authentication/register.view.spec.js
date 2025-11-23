import { mount } from '@vue/test-utils';
import Comp from '../../../views/authentication/register.view.vue';

// Basic render test
test('register.view renders basic', () => {
  const wrapper = mount(Comp);
  expect(wrapper.exists()).toBe(true);
});

// TODO: add props, events and edge-case tests