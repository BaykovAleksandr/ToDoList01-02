import { changeThemeModeAC } from "@/app/app-reducer";
import { selectThemeMode } from "@/app/app-selectors";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { getTheme } from "@/common/theme/theme";
import { NavButton } from "@/common/components/NavButton/NavButton";
import { MaterialUISwitch } from "@/Switch";

import { AppBar, Container, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { containerSx } from '@/common/styles/container.style';

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);

  const dispatch = useAppDispatch();

  const theme = getTheme(themeMode);

  const changeMode = () => {
    dispatch(
      changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" })
    );
  };

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <MaterialUISwitch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
