import { ComponentStory, ComponentMeta } from '@storybook/react';
import Index from './index';

export default {
  title: 'Team Granite Alpha/index',
  component: Index,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Index>;

const Template: ComponentStory<typeof Index> = (args) => <Index {...args} />;

export const Message = Template.bind({});

Message.args = {
  text: "Welcome to Team Granite's Storybook",
  children: <Index />,
};
