import { useEffect, useState } from "react"
import { fetchProfile } from "../api/userApi"
import Navbar from "../components/Navbar"
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
    const {userId} = useParams();
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        fetchProfile(userId)
        .then(res => setUser(res.user))
        .catch(err => console.error(err));
    }, [userId])
    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <main className="main">
                {user && <div>
                    <p className="border-b-2 text-gray-500">{user.name}</p>
                </div>}
                <div>
                    {/* posts */}
                </div>
            </main>
            <div className="right-col"></div>
            
        </div>
    )
}

export default ProfilePage
