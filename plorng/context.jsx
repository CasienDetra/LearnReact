import React, { Children, createContext, useState } from "react";

const LangContext = createContext();

export const LangProvider = ({ Children }) => {
  const [lang, setLang] = useState("eng");
  const ToggleLang = () => {
    setLang(lang === "eng" ? "khm" : "eng");
  };
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {Children}
    </LangContext.Provider>
  );
  // custom hook from here
};
export const useLang = () => {
  const context = React.useContext(LangContext);
  if (!context) {
    throw new Error("Hello Boss This Code Errors");
  }
  return context;
};
