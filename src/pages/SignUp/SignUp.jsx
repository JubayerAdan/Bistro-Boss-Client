import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Create an Account</h1>
                        <p className="text-gray-500 text-center mb-6">Join us and enjoy exclusive benefits!</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Name</label>
                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 focus:border-sky-600 focus:shadow" />
                                {errors.name && <span className="text-red-600 text-sm">Name is required</span>}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Photo URL</label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 focus:border-sky-600 focus:shadow" />
                                {errors.photoURL && <span className="text-red-600 text-sm">Photo URL is required</span>}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Email</label>
                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 focus:border-sky-600 focus:shadow" />
                                {errors.email && <span className="text-red-600 text-sm">Email is required</span>}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Password</label>
                                <input type="password"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="Password" className="input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 focus:border-sky-600 focus:shadow" />
                                {errors.password?.type === 'required' && <p className="text-red-600 text-sm">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600 text-sm">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600 text-sm">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600 text-sm">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                <div className="flex justify-end mt-1">
                                    <a href="#" className="text-xs text-sky-600 hover:text-sky-800">Forgot password?</a>
                                </div>
                            </div>
                            <button type="submit" className="btn w-full bg-sky-600 text-white hover:bg-sky-700 mt-2">Sign Up</button>
                        </form>
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-sky-600 hover:text-sky-800 font-semibold">Login</Link>
                        </p>
                        <div className="mt-6">
                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;