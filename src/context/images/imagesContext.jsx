import { createContext, useContext } from 'react';

export const ImagesContext = createContext(null);
export const useGlobalContext = () => useContext(ImagesContext);
