import Footer from '../components/Footer';

const Documentation = () => {
    return (
        <div className="min-h-screen font-sans pt-20 bg-gradient-to-b from-green-50/50 to-white text-gray-800">
            <div className="max-w-[98%] lg:max-w-[1650px] mx-auto px-6 py-12">

                {/* Hero / Header Section */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-6">AgroVision Documentation</h1>
                    <div className="h-1 w-24 bg-green-500 mx-auto rounded-full"></div>
                </div>

                {/* Introduction */}
                <section className="mb-16 grid md:grid-cols-2 gap-8 items-center animate-fade-in delay-100">
                    <div>
                        <h2 className="text-3xl font-semibold mb-4 text-gray-900 border-l-4 border-green-500 pl-4">Introduction</h2>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Welcome to <strong>AgroVision documentation</strong>. <br /><br />
                            AgroVision is a smart agriculture platform designed to help farmers and administrators monitor crops, manage data, and make better decisions using modern technology. This documentation explains how to use the platform and its main features.
                        </p>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 max-w-lg mx-auto">
                        <img src="/images/drone.png" alt="Agriculture Drone" className="w-full h-auto object-cover" />
                    </div>
                </section>

                <hr className="border-gray-200 my-10" />

                {/* Getting Started */}
                <section className="mb-16 animate-fade-in delay-200">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-900 border-l-4 border-green-500 pl-4">Getting Started</h2>
                    <p className="text-lg text-gray-600 mb-6">To start using AgroVision:</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {['Create an account or log in to the platform.', 'Select your role (User or Admin).', 'Access the dashboard to manage and view data.'].map((step, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <span className="text-5xl font-bold text-green-100 mb-4 block">0{index + 1}</span>
                                <p className="font-medium text-gray-700 text-lg">{step}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="border-gray-200 my-10" />

                {/* User Roles */}
                <section className="mb-16 animate-fade-in delay-300">
                    <h2 className="text-3xl font-semibold mb-8 text-gray-900 border-l-4 border-green-500 pl-4">User Roles</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
                            <h3 className="text-2xl font-bold mb-4 text-blue-600 flex items-center gap-2">
                                <i className='bx bx-user'></i> User (Farmer)
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-2"><i className='bx bx-check text-green-500 mt-1'></i> View crop information and reports</li>
                                <li className="flex items-start gap-2"><i className='bx bx-check text-green-500 mt-1'></i> Monitor soil, weather, and environmental data</li>
                                <li className="flex items-start gap-2"><i className='bx bx-check text-green-500 mt-1'></i> Receive notifications and recommendations</li>
                                <li className="flex items-start gap-2"><i className='bx bx-check text-green-500 mt-1'></i> Access historical data</li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-purple-500">
                            <h3 className="text-2xl font-bold mb-4 text-purple-600 flex items-center gap-2">
                                <i className='bx bx-shield-quarter'></i> Admin
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-2"><i className='bx bx-check text-purple-500 mt-1'></i> Manage users and permissions</li>
                                <li className="flex items-start gap-2"><i className='bx bx-check text-purple-500 mt-1'></i> Add, update, or delete agricultural data</li>
                                <li className="flex items-start gap-2"><i className='bx bx-check text-purple-500 mt-1'></i> Monitor system performance</li>
                                <li className="flex items-start gap-2"><i className='bx bx-check text-purple-500 mt-1'></i> Generate analytics and reports</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-200 my-10" />

                {/* Dashboard & Security */}
                <section className="mb-16 grid md:grid-cols-2 gap-12 animate-fade-in delay-400">
                    <div className='relative max-w-lg mx-auto transform hover:scale-105 transition-transform duration-500'>
                        <img src="/images/leaf.png" alt="Leaf Detail" className="w-full h-auto object-cover rounded-xl shadow-xl" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl flex items-end p-6">
                            <h3 className="text-white text-2xl font-bold">Dashboard Overview</h3>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-3 text-gray-900">Dashboard Overview</h2>
                            <p className="text-gray-600">The dashboard is the main interface of AgroVision. It provides real-time data visualization, charts, statistics, and quick access to important actions.</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-3 text-gray-900">Security</h2>
                            <p className="text-gray-600 mb-3">AgroVision ensures data security through:</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700">Secure authentication</span>
                                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700">Role-based access control</span>
                                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700">Protected data storage</span>
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-200 my-10" />

                {/* FAQ */}
                <section className="mb-16 animate-fade-in delay-500">
                    <h2 className="text-3xl font-semibold mb-8 text-gray-900 border-l-4 border-green-500 pl-4">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <h4 className="text-lg font-bold text-gray-800 mb-2">Is AgroVision free?</h4>
                            <p className="text-gray-600">Some features are free, while advanced tools may require a subscription.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <h4 className="text-lg font-bold text-gray-800 mb-2">Can I use AgroVision on mobile devices?</h4>
                            <p className="text-gray-600">Yes, AgroVision is fully responsive and works on all devices.</p>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-200 my-10" />

                {/* Support */}
                <section className="text-center bg-green-50 py-12 rounded-2xl animate-fade-in delay-500">
                    <h2 className="text-3xl font-bold text-green-800 mb-4">Support</h2>
                    <p className="text-lg text-gray-700 mb-6 font-medium">If you need help or have any questions, please contact us:</p>
                    <a href="mailto:support@agrovision.com" className="inline-flex items-center gap-2 bg-green-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-green-500/30">
                        <i className='bx bx-envelope'></i> support@agrovision.com
                    </a>
                </section>

            </div>

            <Footer />
        </div>
    );
};

export default Documentation;
