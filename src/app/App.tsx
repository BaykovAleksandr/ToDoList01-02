import { Header } from "@/common/components/Header/Header";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "../common/hooks/theme/theme";
import { selectThemeMode } from "./app-selectors";
import "./App.css";
import { Main } from "./Main";

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);

  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  );
};
