import React, { useState, useRef, useEffect } from "react";
import UserCard from "./UserCard";

const AppBar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const dropdownRef = useRef(null);
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return <div className="shadow h-14 flex justify-between">
        <div className="text-xl font-bold flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello {user.firstName}
            </div>
            <div className="relative" ref={dropdownRef}>
                <div 
                    onClick={() => setShowDropdown(!showDropdown)} 
                    className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 cursor-pointer"
                >
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0].toUpperCase()}
                    </div>
                </div>
                {showDropdown && (
                    <div className="absolute right-0 mt-2 z-10">
                        <UserCard user={user} />
                    </div>
                )}
            </div>
        </div>
    </div>
}

export default AppBar;