import ServiceComponent from './service-component';

export default {
  component: ServiceComponent,
  title: 'ServiceComponent'
};

const Template = (args) => <ServiceComponent {...args} />;

export const ServicesItem = Template.bind({});
ServicesItem.args = {
  name: "ExampleName",
  time: 40,
  price: 39.99,
  review: 5
};
