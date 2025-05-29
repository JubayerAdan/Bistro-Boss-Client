import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin, isAdminLoading] = useAdmin();
  
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <Link to="/" className="text-sky-600 hover:text-sky-800 transition-colors">Home</Link>
      </li>
      <li>
        <Link to="/menu" className="text-sky-600 hover:text-sky-800 transition-colors">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad" className="text-sky-600 hover:text-sky-800 transition-colors">Order Food</Link>
      </li>
      <li>
        <Link 
          to={isAdmin ? "/dashboard/adminhome" : "/dashboard/userhome"}
          className="text-sky-600 hover:text-sky-800 transition-colors"
        >
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          to={`/dashboard/${
            !isAdminLoading ? (isAdmin ? "users" : "cart") : ""
          }`}
        >
          <button className="btn btn-ghost btn-circle relative text-sky-600 hover:text-sky-800">
            Cart ({cart.length})
          </button>
        </Link>
      </li>
      {user ? (
        <>
          <button 
            onClick={handleLogOut} 
            className="btn btn-ghost text-sky-600 hover:text-sky-800 transition-colors"
          >
            LogOut
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/login" className="text-sky-600 hover:text-sky-800 transition-colors">Login</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-white border-b border-gray-200 shadow-sm w-full">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4">
          <div className="navbar-start flex items-center">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <span className="text-sky-600">Menu</span>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-xl w-52 border border-gray-100"
              >
                {navOptions}
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost normal-case text-xl text-sky-600 hover:bg-gray-100">
              Bistro Boss
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {navOptions}
            </ul>
          </div>
          <div className="navbar-end flex items-center gap-2">
            <Link to="/menu" className="btn bg-sky-600 text-white hover:bg-sky-700 border-none transition-colors">
              Get started
            </Link>
            {user && (
              <button
                onClick={handleLogOut}
                className="btn btn-ghost text-sky-600 hover:text-sky-800 transition-colors hidden lg:inline-flex"
              >
                LogOut
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
