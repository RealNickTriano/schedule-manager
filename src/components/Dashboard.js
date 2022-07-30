import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import Day from './Day';
import { FcGoogle } from "react-icons/fc";

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
            setEmail(data.email);
            setPhoto(data.photo);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
        fetchUserName();
    }, [user, loading]);

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <h1 className="text-3xl text-blue-500 text-center font-bold">Welcome, {name}!</h1>
            <div className='flex flex-col justify-center items-start bg-gray-200 rounded-lg shadow-lg mt-12'>
                <div className="flex justify-between items-center w-full px-5 py-2">
                    <div className="flex justify-center items-center gap-2 font-medium">
                        <img 
                            src={photo} alt="profile_picture"
                            className="rounded-full w-14 border-4 border-white shadow-lg"
                        />
                        <div className="flex flex-col justify-center items-start">
                            <h1>{name}</h1>
                            <h1>{email}</h1>
                        </div>
                    </div>
                    <button 
                        className="bg-white text-black font-medium flex justify-center items-center gap-2 shadow-md py-2 px-5 rounded-lg" 
                        onClick={logout}
                    >
                        <FcGoogle size={25}/>
                        <span>Sign Out</span>
                    </button>
                </div>
                <div className='bg-blue-400 flex justify-between items-center w-full py-2 px-5'>
                    <h1 className='font-bold text-xl'>Your Schedule</h1>
                    <div className='flex justify-center items-center gap-2'>
                        <button>
                            <FaAngleDoubleLeft size={25}/>
                        </button>
                        <button>
                            <FaAngleDoubleRight size={25}/>
                        </button>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-2 p-8'>
                    <Day />
                    <Day />
                    <Day />
                    <Day />
                    <Day />
                    <Day />
                    <Day />
                </div>
            </div>
    </div>
    );
}
export default Dashboard;