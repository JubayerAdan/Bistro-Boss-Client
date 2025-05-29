import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        if (user && user.email) {
            //send cart item to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
        } else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-xl duration-200">
            <div className="relative">
                <img src={image} alt={name} className="w-full h-56 object-cover" />
                <span className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-lg font-semibold rounded-full shadow">${price}</span>
            </div>
            <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold mb-2 text-gray-900">{name}</h2>
                <p className="text-gray-600 mb-4 flex-1">{recipe}</p>
                <button
                    onClick={handleAddToCart}
                    className="mt-auto btn bg-blue-600 text-white hover:bg-blue-700 border-none w-full rounded-lg shadow-sm"
                >Add to Cart</button>
            </div>
        </div>
    );
};

export default FoodCard;