import { lazy } from "react";
const Center = lazy(() => import("./center"));
const Login = lazy(() => import("./login"));
const Hello = lazy(() => import("./hello"));
const UserPage = lazy(() => import("./sys/user"));
const RolePage = lazy(() => import("./sys/role"));

export { Center, Login, Hello, UserPage, RolePage };
