import { mount } from '@vue/test-utils';
import Comp from '../../../views/doctor/doctor.creator.view.vue';

// Basic render test
test('doctor.creator.view renders basic', () => {
  const wrapper = mount(Comp);
  expect(wrapper.exists()).toBe(true);
});

// Props detected in component - add a basic props test
test('renders with props', () => {
  // TODO: provide realistic props
  const wrapper = mount(Comp, { props: {} });
  expect(wrapper.exists()).toBe(true);
});

// TODO: add props, events and edge-case tests