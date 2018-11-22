import { Config } from '@stencil/core';
const { sass } = require('@stencil/sass');

export const config: Config = {
  namespace: 'soon-colorpicker',
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
