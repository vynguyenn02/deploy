import React from "react";
import './forgotpassword.css';
import { FaUser } from "react-icons/fa";

const ForgotPasswordForm = () => {
    return (

        <div className="wrapper">
            <form action="">
                <h1>Forgot Password</h1>
                <div className="input-box">
                    <input type="text" placeholder="Please re-enter your email" required />
                    <FaUser className="icon" />
                </div>


                <button type="submit">Confirm</button>

                <div className="register-link">
                    <p>Do not have an account? <a href="register">Register</a></p>
                    <p>have an account? <a href="login">Login</a></p>
                </div>
            </form>


        </div>


    )
}

export default ForgotPasswordForm;