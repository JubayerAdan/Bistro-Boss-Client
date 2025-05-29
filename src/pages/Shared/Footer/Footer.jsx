const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div className="text-2xl font-bold text-blue-600">Bistro Boss</div>
                        <p className="text-gray-600">Exceptional dining experiences since 1992</p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/menu" className="text-gray-600 hover:text-blue-600 transition-colors">Our Menu</a></li>
                            <li><a href="/order/salad" className="text-gray-600 hover:text-blue-600 transition-colors">Order Food</a></li>
                            <li><a href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</a></li>
                            <li><a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-semibold">FB</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-semibold">TW</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-semibold">IG</a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                    <p className="text-gray-500">© 2024 Bistro Boss. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;