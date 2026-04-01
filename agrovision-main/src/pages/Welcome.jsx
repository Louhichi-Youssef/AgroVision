import { Link, useNavigate } from 'react-router-dom'
import 'boxicons/css/boxicons.min.css'
import bgImage from '../assets/bg.jpg'

const Welcome = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen w-full bg-white relative overflow-hidden flex flex-col items-center pt-16 px-6">

            {/* Back to Home Arrow */}
            <Link
                to="/"
                className="absolute top-6 left-6 md:top-10 md:left-10 text-black text-3xl md:text-5xl 
                         hover:scale-110 transition-transform duration-300 z-50 transition-all"
                title="Retour à l'accueil"
            >
                <i className='bx bx-left-arrow-alt'></i>
            </Link>

            {/* Background Waves - mimicking the screenshot's subtle waves */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <img
                    src={bgImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-sm md:max-w-xl lg:max-w-2xl flex flex-col items-center">

                {/* Logo */}
                <div className="mb-12 md:mb-16">
                    <img
                        src="/agrovision.png"
                        alt="AgroVision"
                        className="h-16 md:h-24 lg:h-32 w-auto object-contain"
                    />
                </div>

                {/* Tagline */}
                <div className="mb-12 md:mb-16 text-left w-full pl-2">
                    <h1 className="text-[42px] md:text-[60px] lg:text-[72px] font-normal text-black leading-[1.1] tracking-tight">
                        “Smarter farming.<br />
                        Powered by AI.”
                    </h1>
                </div>

                {/* Action Buttons */}
                <div className="w-full space-y-4 md:space-y-6">

                    {/* Sign Up Button - Green */}
                    <Link
                        to="/signup"
                        className="block w-full py-4 md:py-6 px-6 bg-[#22C55E] text-black font-bold text-center rounded-full
                     hover:brightness-95 transition-all text-sm md:text-lg tracking-wide uppercase"
                    >
                        SIGN UP FOR FREE
                    </Link>

                    {/* Sign In Button - Outline */}
                    <Link
                        to="/signin"
                        className="block w-full py-4 md:py-6 px-6 bg-white border border-black text-black font-bold text-center rounded-full
                     hover:bg-gray-50 transition-all text-sm md:text-lg tracking-wide uppercase"
                    >
                        SIGN IN WITH YOUR ACCOUNT
                    </Link>

                    {/* Google Sign In - Outline */}
                    <button
                        onClick={() => console.log('Google sign in')}
                        className="block w-full py-4 md:py-6 px-6 bg-white border border-black text-black font-bold text-center rounded-full
                     hover:bg-gray-50 transition-all text-sm md:text-lg tracking-wide uppercase"
                    >
                        CONTINUE WITH GOOGLE
                    </button>

                    {/* Facebook Sign In - Outline */}
                    <button
                        onClick={() => console.log('Facebook sign in')}
                        className="block w-full py-4 md:py-6 px-6 bg-white border border-black text-black font-bold text-center rounded-full
                     hover:bg-gray-50 transition-all text-sm md:text-lg tracking-wide uppercase"
                    >
                        CONTINUE WITH FACEBOOK
                    </button>

                </div>

            </div>

            {/* Bottom gap */}
            <div className="mt-auto pb-12"></div>

        </div>
    )
}

export default Welcome
