import { Outlet, useLocation } from "react-router-dom";
import { LoggedInUserProvider } from "./contexts/useLoggedInUser";
import { AppInitialisation } from "./components/layouts/AppInitialisation";
import { Navbar } from "./components/navbar/Navbar";

const App = () => {
    const location = useLocation();
    const isLoginOrRegisterPage = ["/login", "/register"].includes(
        location.pathname
    );

    const backgroundColor = isLoginOrRegisterPage ? "" : "bg-slate-100";

    return (
        <div>
            <LoggedInUserProvider>
                <AppInitialisation>
                    <Navbar />
                    <div className={`${backgroundColor} py-8`}>
                        <Outlet />
                    </div>
                </AppInitialisation>
            </LoggedInUserProvider>
        </div>
    );
};

export { App };
