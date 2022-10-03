import { Link } from "react-router-dom";
import { useLoggedInUser } from "../../contexts/useLoggedInUser";
import Logo from "../../assets/logo.png";

const Navbar = () => {
    const { loggedInUser, logout } = useLoggedInUser();

    return (
        <nav className="bg-white shadow-xl stick top-0 px-8 py-4 flex items-center">
            <Link to="/" className="flex-none">
                <img
                    src={Logo}
                    alt="flacebook logo"
                    className="inline-block w-10"
                />
            </Link>
            <div className="grow text-right">
                {loggedInUser ? (
                    <>
                        <Link to="/profile" className="inline-block">
                            <img
                                src={loggedInUser.avatar}
                                alt={`${loggedInUser.firstName}-${loggedInUser.lastName}-avatar`}
                                className="rounded-full inline-block mr-2 w-10"
                            />
                            <span className="inline-block mr-2">{`${loggedInUser.firstName} ${loggedInUser.lastName}`}</span>
                        </Link>
                        <button
                            className="bg-sky-700 text-white py-2 px-3 rounded hover:opacity-80"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="inline-block hover:bg-sky-700 hover:text-white py-2 px-3 rounded"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="inline-block hover:bg-sky-700 hover:text-white py-2 px-3 rounded"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export { Navbar };
