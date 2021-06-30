import { createContext } from 'react';

const isEmailConfirmed: boolean | null = null;

type Context = {
  isEmailConfirmed: boolean | null;
  setIsEmailConfirmed: (state: boolean) => void;
};

export const initialContext: Context = {
    isEmailConfirmed,
    setIsEmailConfirmed: () => {}
}

export default createContext(initialContext);