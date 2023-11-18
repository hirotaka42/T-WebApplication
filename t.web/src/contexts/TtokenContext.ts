import { createContext, Dispatch, SetStateAction } from 'react';
import { platformToken } from '../types/token'

type TokenContextType = {
  platformToken: platformToken | null;
  setPlatformToken: Dispatch<SetStateAction<platformToken| null>>;
};

export const TokenContext = createContext<TokenContextType | null>(null);
