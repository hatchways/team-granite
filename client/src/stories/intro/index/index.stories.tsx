import { ComponentStory, ComponentMeta } from '@storybook/react';
import Index from './index';
import { Button } from '../components';

export default {
  title: 'Team Granite Alpha/index',
  component: Index,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Index>;

const Template: ComponentStory<typeof Index> = (args) => <Index {...args} />;

export const ComponentOne = Template.bind({});

ComponentOne.args = {
  text: "Welcome to Team Granite's Storybook",
  children: <Button variant="primary" text="Primary" />,
};

export const ComponentTwo = Template.bind({});
ComponentTwo.args = {
  text: "Welcome to Team Granite's Storybook",
  children: <Button variant="secondary" text="Secondary" />,
};
