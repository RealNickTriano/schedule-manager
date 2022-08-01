import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import ScheduleWeek from "./ScheduleWeek";
import Navbar from "./Navbar";
import AvailabilityCard from "./AvailabilityCard";

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState("");
    const [firstDay, setFirstDay] = useState(new Date());
    const [startDays, setStartDays] = useState(Array(3).fill(null));
    const [weekAnimation, setWeekAnimation] = useState('');
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

    const getFirstDayThisWeek = () => {
        const todayDate = new Date()
        const today = todayDate.getDay()
        let startDate = new Date()
        for (let i = 0; i < today; i++) {
            startDate = new Date(startDate.getTime() - 60 * 60 * 24 *1000) 
        }
        return startDate
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
        const startDaysArray = []
        fetchUserName();
        setFirstDay(getFirstDayThisWeek())

        const currentDate = getFirstDayThisWeek()
        const prevDate = new Date(currentDate.getTime() - (60 * 60 * 24 * 1000 * 7))
        const nextDate = new Date(currentDate.getTime() + (60 * 60 * 24 * 1000 * 7))
        startDaysArray.push(prevDate)
        startDaysArray.push(currentDate)
        startDaysArray.push(nextDate)
        setStartDays(startDaysArray)

    }, [user, loading]);

    const onArrowLeft = () => {
        setWeekAnimation('slideRight')
        setTimeout(() => {
            const oldStartDaysArray = startDays
            const newStartDaysArray = []

            const currentDate = oldStartDaysArray[0]
            const prevDate = new Date(currentDate.getTime() - (60 * 60 * 24 * 1000 * 7))
            const nextDate = oldStartDaysArray[1]

            newStartDaysArray.push(prevDate)
            newStartDaysArray.push(currentDate)
            newStartDaysArray.push(nextDate)
            setStartDays(newStartDaysArray)
            setWeekAnimation('')
        }, 500);
    }

    const onArrowRight = () => {
        setWeekAnimation('slideLeft')

        setTimeout(() => {
            const oldStartDaysArray = startDays
            const newStartDaysArray = []

            const currentDate = oldStartDaysArray[2]
            const prevDate = oldStartDaysArray[1]
            const nextDate = new Date(currentDate.getTime() + (60 * 60 * 24 * 1000 * 7))
            
            newStartDaysArray.push(prevDate)
            newStartDaysArray.push(currentDate)
            newStartDaysArray.push(nextDate)
            setStartDays(newStartDaysArray)
            setWeekAnimation('')
        }, 500);   
    }

    return (
        <>
        <Navbar />
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <h1 className="text-3xl text-blue-500 text-center font-bold">Welcome, {name}!</h1>
            <div className='flex flex-col justify-center items-start bg-gray-200 rounded-lg shadow-lg mt-12'>
                <div className="flex justify-between items-center w-full px-5 py-2">
                    <div className="flex justify-center items-center gap-2 font-medium">
                        <img 
                            referrerPolicy="no-referrer"
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
                        <button
                            onClick={onArrowLeft}
                        >
                            <FaAngleDoubleLeft size={25}/>
                        </button>
                        <button
                            onClick={onArrowRight}
                        >
                            <FaAngleDoubleRight size={25}/>
                        </button>
                    </div>
                </div>

                <div
                    className="flex justify-center items-center w-[1200px] overflow-x-hidden mt-5 mx-5 h-64">
                    <div 
                        className="flex justify-center items-center gap-5"
                        style={{animationName: weekAnimation, animationDuration: '0.5s'}} 
                    >
                        <ScheduleWeek 
                            startDay={startDays[0]}
                        />
                        <ScheduleWeek 
                            startDay={startDays[1]}
                        />
                        <ScheduleWeek 
                            startDay={startDays[2]}
                        />
                    </div>
                </div>
            </div>
            <AvailabilityCard />
            
        </div>
    </>
    );
}
export default Dashboard;