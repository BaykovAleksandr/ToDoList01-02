import { Header } from "@/common/components/Header/Header";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "../common/hooks/theme/theme";
import { selectThemeMode } from "./app-slice";
import { ErrorSnackbar } from '@/common/components/ErrorSnackBar/ErrorSnackbar';
import { Routing } from '@/common/routing';
import { useEffect, useState } from 'react';
import styles from "./App.module.css";
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { CircularProgress } from '@mui/material';
import { initializeAppTC } from '@/features/auth/model/auth-slice';

export const App = () => {
   const [isInitialized, setIsInitialized] = useState(false);

   const themeMode = useAppSelector(selectThemeMode);

   const dispatch = useAppDispatch();

   const theme = getTheme(themeMode);

   useEffect(() => {
     dispatch(initializeAppTC()).finally(() => {
       setIsInitialized(true);
     });
   }, []);

   if (!isInitialized) {
     return (
       <div className={styles.circularProgressContainer}>
         <CircularProgress size={100} thickness={3} />
       </div>
     );
   }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  );
};
