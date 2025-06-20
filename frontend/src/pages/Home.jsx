import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* App Header */}
            <header className="bg-blue-600 p-5 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-2xl font-bold">PayTM</div>
                    <div className="flex items-center space-x-3">
                        <div className="bg-white p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="container mx-auto px-4 pt-10 pb-16">
                <div className="text-center mb-12">
                    <Heading label={"Welcome to PayTM"} />
                    <SubHeading label={"The simplest way to manage your money"} />
                    
                    <div className="mt-8 flex flex-col items-center">
                        <div className="w-64 h-64 bg-blue-500 rounded-full flex items-center justify-center mb-8 shadow-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 w-full max-w-md">
                            <Button 
                                onClick={() => navigate("/signup")} 
                                label={"Signup"} 
                                className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-medium shadow-md" 
                            />
                            <Button 
                                onClick={() => navigate("/signin")} 
                                label={"Signin"} 
                                className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 py-4 rounded-lg text-lg font-medium shadow-md" 
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <footer className="bg-gray-100 py-8 mt-12">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    <p>© 2025 PayEase. All rights reserved.</p>
                    <div className="mt-4 flex justify-center space-x-6">
                        <a href="#" className="text-gray-500 hover:text-blue-600">Terms</a>
                        <a href="#" className="text-gray-500 hover:text-blue-600">Privacy</a>
                        <a href="#" className="text-gray-500 hover:text-blue-600">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;