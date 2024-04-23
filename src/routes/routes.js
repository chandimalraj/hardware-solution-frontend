import Inventory from "../components/app/inventory/Inventory";
import Dashboard from "../components/dashboard/Dashboard";
import Login from "../components/login/Login";

export const Routes = [
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"/dashboard",
        element:<Dashboard/>
    },
    {
        path:"/inventory",
        element:<Inventory/>
    }
]