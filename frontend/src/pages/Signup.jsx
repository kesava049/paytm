import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import  BottomWarning  from "../components/BottomWarning";
import axios from "axios";
const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <Heading label={"Signup"} />
                <SubHeading label="Enter your details to create an account" />
                
                <InputBox onChange= { (e) => {
                    setFirstName(e.target.value)
                }} placeholder="ex:kesav" label={"First Name"} />
                <InputBox onChange={(e) => {
                    setLastName(e.target.value)
                }} placeholder="ex:kalepalli" label={"Last Name"} />
                <InputBox onChange={(e) => {
                    setUsername(e.target.value)
                }} placeholder="ex:kesav@gmail.com" label={"Email"} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} placeholder="ex:1234567" label={"Password"} />


                <div className="pt-4">
                    <Button onClick={()=>{
                        axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            password,
                            firstName,
                            lastName,
                        })
                        
                    }}label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText="Sign in" to="/signin"/>
            </div>
        </div>
    );
}

export default Signup;