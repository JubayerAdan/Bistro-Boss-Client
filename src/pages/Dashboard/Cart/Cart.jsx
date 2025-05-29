import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Cart Summary</h2>
            <div className="text-gray-600">Items: <span className="font-semibold text-sky-700">{cart.length}</span></div>
            <div className="text-gray-600">Total Price: <span className="font-semibold text-sky-700">${totalPrice}</span></div>
          </div>
          <Link to="/dashboard/payment">
            <button className="btn bg-sky-600 text-white hover:bg-sky-700 px-8 rounded-lg shadow">Pay</button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-gray-500 font-semibold">#</th>
                <th className="py-3 px-4 text-left text-gray-500 font-semibold">Image</th>
                <th className="py-3 px-4 text-left text-gray-500 font-semibold">Name</th>
                <th className="py-3 px-4 text-left text-gray-500 font-semibold">Price</th>
                <th className="py-3 px-4 text-left text-gray-500 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item._id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover border"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-medium">{item.name}</td>
                  <td className="py-3 px-4 text-gray-700 font-semibold">${item.price}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-outline btn-sm text-red-600 border-red-200 hover:bg-red-50 hover:text-red-800 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
