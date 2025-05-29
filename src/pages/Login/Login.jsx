import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Login to Your Account</h1>
                        <p className="text-gray-500 text-center mb-6">Welcome back! Please enter your details.</p>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Email</label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 focus:border-sky-600 focus:shadow" />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Password</label>
                                <input type="password" name="password" placeholder="Password" className="input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 focus:border-sky-600 focus:shadow" />
                                <div className="flex justify-end mt-1">
                                    <a href="#" className="text-xs text-sky-600 hover:text-sky-800">Forgot password?</a>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Captcha</label>
                                <LoadCanvasTemplate />
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Type the captcha above" className="input input-bordered w-full mt-2 bg-gray-50 border border-gray-300 text-gray-900 focus:border-sky-600 focus:shadow" />
                            </div>
                            <button type="submit" disabled={disabled} className="btn w-full bg-sky-600 text-white hover:bg-sky-700 mt-2">Login</button>
                        </form>
                        <p className="mt-6 text-center text-sm text-gray-600">
                            New Here?{' '}
                            <Link to="/signup" className="text-sky-600 hover:text-sky-800 font-semibold">Create an account</Link>
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

export default Login;