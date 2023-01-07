import {auth,provider} from "../config/firebase"
import {signInWithPopup } from "firebase/auth";
import {useNavigate} from "react-router-dom";

export const Login=()=>{
    const navigate=useNavigate();

    const signinwithGoogle= async()=>{
        const result= await signInWithPopup(auth,provider);
        console.log(result);
        navigate('/');
    }
    return (
    <div>
        <p>SignIn with Google</p>
        <button onClick={signinwithGoogle}>SIGNIN</button>
    </div>
    );
}