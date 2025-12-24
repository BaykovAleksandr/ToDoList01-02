import { Main } from "@/app/Main";

import { Route, Routes } from "react-router";
import { PageNotFound } from "../components/PageNotFound";
import { Login } from '@/features/auth/ui/Login';

export const Path = {
  Main: "/",
  Login: "login",
  NotFound: "*",
} as const;

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<Main />} />
    <Route path={Path.Login} element={<Login />} />
    <Route path={Path.NotFound} element={<PageNotFound />}></Route>
  </Routes>
);
