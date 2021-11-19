import TestPlugin from './TestPlugin';
import React from 'react';

interface PluginComponentList {
  [key: string]: React.FC;
}

//Register all plugins here. pluginKey : pluginComponent
const pluginComponentList: PluginComponentList = {
  testPlugin: TestPlugin,
};

export const getPluginComponent = (pluginKey: string): React.FC => {
  return pluginComponentList[pluginKey];
};
