import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Navbar from "./Navbar";
import AvailabilityCard from "./AvailabilityCard";
import ScheduleCard from "./ScheduleCard";

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
        fetchUserName();

    }, [user, loading]);

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

    return (
        <>
        <Navbar />
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <h1 className="text-3xl text-indigo-600 text-center font-bold">Welcome, {name}!</h1>
            <ScheduleCard />
            <AvailabilityCard />
            
        </div>
    </>
    );
}
export default Dashboard;