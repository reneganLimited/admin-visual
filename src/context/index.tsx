import { createContext, useState, ReactElement } from "react";
import { IContext, TKYCFilter } from "../types";

export const Context = createContext<IContext | null>(null);

export const ContextProvider = ({
  children,
}: {
  [key: string]: ReactElement;
}) => {
  const [KYCFilter, setKYCFilter] = useState<TKYCFilter>("ALL");
  const [TypeFilter, setTypeFilter] = useState<any>("ALL");

  return (
    <Context.Provider
      value={{
        KYCFilter,
        TypeFilter,
        setTypeFilter,
        setKYCFilter,
      }}
    >
      {children}
    </Context.Provider>
  );
};
