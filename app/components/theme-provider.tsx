import { createContext, useContext } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProviderContext = createContext<{}>({});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProviderContext.Provider {...props} value={{}}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
