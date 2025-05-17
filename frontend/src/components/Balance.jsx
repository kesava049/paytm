import React from "react";

const Balance = ({ value }) => {
    // Format the balance to display as a whole number
    const formattedBalance = Math.floor(value);
    
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            = {formattedBalance} rs.
        </div>
    </div>
}

export default Balance;