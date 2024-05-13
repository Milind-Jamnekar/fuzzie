"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type BillingProviderProps = {
  credits: number;
  tier: string;
  setCredits: Dispatch<SetStateAction<number>>;
  setTier: Dispatch<SetStateAction<string>>;
};

const initialValues: BillingProviderProps = {
  credits: 0,
  setCredits: () => undefined,
  tier: "",
  setTier: () => undefined,
};

type WithChildProps = {
  children: ReactNode;
};

const context = createContext(initialValues);
const { Provider } = context;

export const BillingProvider = ({ children }: WithChildProps) => {
  const [credits, setCredits] = useState(initialValues.credits);
  const [tier, setTier] = useState(initialValues.tier);

  const values = {
    credits,
    setCredits,
    tier,
    setTier,
  };

  return <Provider value={values}>{children}</Provider>;
};

export const useBilling = () => {
  const state = useContext(context);
  return state;
};
