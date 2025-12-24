import { Header } from "@/common/components/Header/Header";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "../common/hooks/theme/theme";
import "./App.css";
import { selectThemeMode } from "./app-slice";
import { ErrorSnackbar } from '@/common/components/ErrorSnackBar/ErrorSnackbar';
import { Routing } from '@/common/routing';

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);

  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  );
};
