import { createContext, Dispatch, SetStateAction } from 'react';

type PageContextType = {
    footerSelectValue: number;
    setFooterSelectValue: Dispatch<SetStateAction<number>>;
};

export const PageContext = createContext<PageContextType | null>(null);