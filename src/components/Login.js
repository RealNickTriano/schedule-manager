import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button 
        className="bg-white text-black font-medium flex justify-center items-center gap-2 shadow-md p-2 rounded-xl" 
        onClick={signInWithGoogle}
      >
        <FcGoogle size={25}/>
        <span>Login with Google</span>
      </button>
    </div>
  );
}
export default Login;