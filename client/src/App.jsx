import { Outlet } from "react-router-dom";
import { LoggedInUserProvider } from "./contexts/useLoggedInUser";
import { AppInitialisation } from "./components/layouts/AppInitialisation";
import { Navbar } from "./components/navbar/Navbar";

const App = () => {
    return (
        <div>
            <LoggedInUserProvider>
                <AppInitialisation>
                    <Navbar />
                    <Outlet />
                </AppInitialisation>
            </LoggedInUserProvider>
        </div>
    );
};

export { App };
