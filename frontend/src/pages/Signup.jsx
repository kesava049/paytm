import React from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import  BottomWarning  from "../components/BottomWarning";

const Signup = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <Heading label={"Signup"} />
                <SubHeading label="Enter your details to create an account" />
                <InputBox placeholder="ex:kesav" label={"First Name"} />
                <InputBox placeholder="ex:kalepalli" label={"Last Name"} />
                <InputBox placeholder="ex:kesav@gmail.com" label={"Email"} />
                <InputBox placeholder="ex:1234567" label={"Password"} />
                <div className="pt-4">
                    <Button label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText="Sign in" to="/signin"/>
            </div>
        </div>
    );
}

export default Signup;