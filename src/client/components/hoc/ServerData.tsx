import React, { createContext, useContext } from 'react';
import { ServerData } from 'src/client/types';

export const StateContext = createContext<ServerData>({});

export interface OwnProps {
  data: ServerData,
}

export const Provider: React.FunctionComponent<OwnProps> = ({ children, data }) => (
  <StateContext.Provider value={data}>
    {children}
  </StateContext.Provider>
);
export const useServerData = () => useContext(StateContext);
