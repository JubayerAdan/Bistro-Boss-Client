import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";

const Main = () => {
    const location = useLocation();
    
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            { noHeaderFooter || <NavBar />}
            <main className="pt-16">
                <Outlet />
            </main>
            { noHeaderFooter || <Footer />}
        </div>
    );
};

export default Main;