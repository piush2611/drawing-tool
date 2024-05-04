import { createContext, useContext } from "react";


const CanvasContext = createContext();

export const CanvasContextProvider = CanvasContext.Provider;

export const useCanvasContext = () => useContext(CanvasContext);