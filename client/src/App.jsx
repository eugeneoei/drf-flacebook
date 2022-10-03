import { Outlet } from "react-router-dom";
import { LoggedInUserProvider } from "./contexts/useLoggedInUser";
import { AppInitialisation } from "./components/layouts/AppInitialisation";

const App = () => {
    return (
        <LoggedInUserProvider>
            <AppInitialisation>
                <Outlet />
            </AppInitialisation>
        </LoggedInUserProvider>
    );
};

export { App };
