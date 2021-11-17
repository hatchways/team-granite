import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import FileAttach from './FileAttach';

export default {
  component: FileAttach,
  title: 'plugins/FileAttach',
} as Meta;

const Template: ComponentStory<typeof FileAttach> = (args) => <FileAttach {...args} />;

export const Default = Template.bind({});
