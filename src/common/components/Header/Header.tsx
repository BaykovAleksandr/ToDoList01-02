import { changeThemeModeAC, selectStatus, selectThemeMode } from "@/app/app-slice";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { getTheme } from "@/common/theme/theme";
import { NavButton } from "@/common/components/NavButton/NavButton";
import { MaterialUISwitch } from "@/common/components/Switch/Switch";
import { AppBar, Container, IconButton, LinearProgress, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { containerSx } from "@/common/styles/container.style";
import { logoutTC, selectIsLoggedIn } from '@/features/auth/model/auth-slice';
import { Link } from 'react-router';

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const selectAppStatus = useAppSelector(selectStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  const theme = getTheme(themeMode);

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }));
  };

  const logout = () => {
    dispatch(logoutTC());
  };

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            {isLoggedIn && <NavButton onClick={logout}>Sign out</NavButton>}
            <Link to="/faq">
              <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            </Link>
            <MaterialUISwitch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {selectAppStatus === "loading" && <LinearProgress />}
    </AppBar>
  );
};
