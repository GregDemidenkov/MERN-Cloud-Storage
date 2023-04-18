import { paths } from "./config";

import { LoginPage } from "pages/auth/LoginPage";
import { RegPage } from "pages/auth/RegPage";
import { DiskPage } from "pages/DiskPage";


export const RoutesListAuth = [
    {path: paths.login, element: <LoginPage/>},
    {path: paths.registration, element: <RegPage/>},
    {path: paths.missing, element: <LoginPage/>},
]

export const RoutesList = [
    {path: paths.disk, element: <DiskPage/>},
    {path: paths.missing, element: <DiskPage/>},
]