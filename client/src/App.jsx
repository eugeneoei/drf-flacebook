import { Outlet, useLocation } from "react-router-dom";
import { LoggedInUserProvider } from "./contexts/useLoggedInUser";
import { AppInitialisation } from "./components/layouts/AppInitialisation";
import { Navbar } from "./components/navbar/Navbar";

const App = () => {
    const location = useLocation();
    const isLoginOrRegisterPage = ["/login", "/register"].includes(
        location.pathname
    );

    return (
        <div className={`${isLoginOrRegisterPage ? "" : "bg-slate-100"}`}>
            <LoggedInUserProvider>
                <AppInitialisation>
                    <Navbar />
                    <div className="py-8">
                        <Outlet />
                    </div>
                </AppInitialisation>
            </LoggedInUserProvider>
        </div>
    );
};

export { App };
