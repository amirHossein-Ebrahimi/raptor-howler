import { forwardRef } from 'react';
import useAptor from '../react-aptor';
import getAPI, { APITypes } from './api';
import instantiate, { destroy } from './construct';
import { HowlerParams } from '../types';

export default forwardRef<APITypes, HowlerParams>(function Connector(props, ref) {
  useAptor(
    ref,
    {
      getAPI,
      instantiate,
      destroy,
      params: props,
    },

    [JSON.stringify(props.src)]
  );

  return null;
});
