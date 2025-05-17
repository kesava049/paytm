import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // Redirect to signin if no token
            navigate("/signin");
            return;
        }
        
        // Get initial balance from localStorage
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setBalance(parsedUser.balance || 0);
            } catch (error) {
                console.error("Failed to parse user data:", error);
                localStorage.removeItem("user");
            }
        }
        
        // Fetch fresh balance from API
        fetchLatestBalance(token);
    }, [navigate]);
    
    const fetchLatestBalance = async (token) => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.data.balance !== undefined) {
                setBalance(response.data.balance);
                
                // Update localStorage with new balance
                const userData = localStorage.getItem("user");
                if (userData) {
                    try {
                        const parsedUser = JSON.parse(userData);
                        parsedUser.balance = response.data.balance;
                        localStorage.setItem("user", JSON.stringify(parsedUser));
                    } catch (error) {
                        console.error("Failed to update localStorage:", error);
                    }
                }
            }
        } catch (error) {
            console.error("Failed to fetch latest balance:", error);
        }
    };

    return <div>
        <AppBar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>;
}

export default Dashboard;