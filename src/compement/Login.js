import { useState, useContext } from "react";
import { toast } from 'react-toastify';
import { LoginAPI } from "../service/userservice";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { UserContext } from "../context/Usercontext";
const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [isshowpassword, setisshowpassword] = useState(false);
    const [loadingAPI, setloadingAPI] = useState(false);
    const { loginContext } = useContext(UserContext);
    const navigate = useNavigate();
    const handlelogin = async () => {
        setloadingAPI(true)
        if (!email || !password) {
            toast.error("Email/password is required !");
            setloadingAPI(false);
            return;

        }
        let arr = await LoginAPI(email.trim(), password);
        if (arr && arr.token) {
            loginContext(email);
            navigate("/");
        } else {
            //error
            if (arr && arr.status === 400) {
                toast.error(arr.data.error);
            }
        }
        setloadingAPI(false);
    }
    //click  go back 
    const handlegoback = () => {
        navigate("/");
    }
    //onkeyDown enter
    const handlekeyDown = (event) => {
        console.log(event);
        if (email && password && event && event.key === "Enter") {
            handlelogin();
            return;
        } if (email && event && event.key === "Enter") {
            toast.error("Password is required !");
        }
        if (password && event && event.key === "Enter") {
            toast.error("Email is required !");
        }

    }
    return (
        <>
            <div className="login-container col-12 col-sm-4" >
                <span className="tile">Log in</span>
                <div>Email or Username ( eve.holt@reqres.in )</div>

                <input type="email" placeholder="Email"
                    value={email}
                    onChange={(event) => setemail(event.target.value)}
                    onKeyDown={(event) => handlekeyDown(event)}
                />
                <div className="input-2">
                    <input
                        type={isshowpassword === true ? "text" : "password"} placeholder="Password"
                        value={password}
                        onChange={(event) => setpassword(event.target.value)}
                        onKeyDown={(event) => handlekeyDown(event)}
                    />
                    <i className={isshowpassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                        onClick={() => setisshowpassword(!isshowpassword)} ></i>
                </div>
                <div className="for-got">For got password</div>
                <button
                    className={email && password ? "active" : ""}
                    disabled={email && password ? false : true}
                    onClick={() => handlelogin()}
                ><i className={loadingAPI ? "fa-solid fa-arrow-rotate-right fa-spin" : ""}></i> Log in</button>
                <div className="go-back">
                    <i className="fa-solid fa-angles-left"></i>
                    <span onClick={() => handlegoback()}>&nbsp;Go back</span>
                </div>

            </div >
        </>
    )
}
export default Login;