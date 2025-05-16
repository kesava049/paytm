import React from "react";
export default function Button({label, onClick}) {
    return (
        <button onClick={onClick} type="button" className="w-full bg-gray-800 text-white px-2 py-1 rounded-md" >{label}</button>
    )
}