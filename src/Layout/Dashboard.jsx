import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();

  // TODO: get isAdmin value from the database
  const [isAdmin] = useAdmin();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
        </div>
        <ul id="sidebar" className="menu p-4 text-gray-800">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome" className="text-sky-600 hover:text-sky-800 rounded-lg">
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItem" className="text-sky-600 hover:text-sky-800 rounded-lg">
                  Add an Item
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageitems" className="text-sky-600 hover:text-sky-800 rounded-lg">
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings" className="text-sky-600 hover:text-sky-800 rounded-lg">
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users" className="text-sky-600 hover:text-sky-800 rounded-lg">
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome" className="text-sky-600 hover:text-sky-800 rounded-lg">
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation" className="text-sky-600 hover:text-sky-800 rounded-lg">
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart" className="text-sky-600 hover:text-sky-800 rounded-lg">
                  My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review" className="text-sky-600 hover:text-sky-800 rounded-lg">
                  Add a Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings" className="text-sky-600 hover:text-sky-800 rounded-lg">
                  My Bookings
                </NavLink>
              </li>
            </>
          )}
          {/* shared nav links */}
          <div className="divider my-4"></div>
          <li>
            <NavLink to="/" className="text-sky-600 hover:text-sky-800 rounded-lg">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad" className="text-sky-600 hover:text-sky-800 rounded-lg">
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact" className="text-sky-600 hover:text-sky-800 rounded-lg">
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
