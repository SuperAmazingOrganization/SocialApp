import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Feed from "./Feed.jsx";
import CreateTweet from "./CreateTweet.jsx";
import CommentTweetModal from "./CommentTweetModal.jsx";
import ProfileModal from "./ProfileModal.jsx";
import EditProfileModal from "./EditProfileModal.jsx";
import FollowListModal from "./FollowListModal.jsx";
import UserProfileModal from "./UserProfileModal.jsx";
import { getCurrentUser, getAllUsers, getUserFollowing } from "./api.js";
import { setCurrentUser, cacheUsers, setFollowing, clearUser } from "./store/userSlice.js";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [loading, setLoading] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [followMode, setFollowMode] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userProfileOpen, setUserProfileOpen] = useState(false);

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/login');
                setLoading(false);
                return;
            }
            try {
                const user = await getCurrentUser();
                dispatch(setCurrentUser(user));
                const users = await getAllUsers();
                dispatch(cacheUsers(users));
                const following = await getUserFollowing(user.id);
                dispatch(setFollowing(following.map(u => u.id)));
            } catch (err) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch(clearUser());
                navigate('/login');
            }
            setLoading(false);
        };
        init();
    }, [dispatch, navigate]);

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: '#E53935' }} />
            </Box>
        );
    }

    if (!currentUser) return null;

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8f9fa 0%, #f0f2f5 100%)' }}>
            <Feed
                onOpenProfile={() => setProfileOpen(true)}
                onOpenUserProfile={(user) => { setSelectedUser(user); setUserProfileOpen(true); }}
            />
            <CreateTweet />
            <CommentTweetModal tweet={{ id: 1, body: 'test' }} />
            <ProfileModal
                open={profileOpen}
                onClose={() => setProfileOpen(false)}
                onEdit={() => { setProfileOpen(false); setEditProfileOpen(true); }}
                onLogout={() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    dispatch(clearUser());
                    navigate('/login');
                }}
                onOpenFollowers={(mode) => { setFollowMode(mode); setProfileOpen(false); }}
            />
            <EditProfileModal
                open={editProfileOpen}
                onClose={() => setEditProfileOpen(false)}
            />
            <FollowListModal
                open={!!followMode}
                onClose={() => setFollowMode(null)}
                mode={followMode}
                userId={currentUser?.id}
            />
            <UserProfileModal
                open={userProfileOpen}
                onClose={() => setUserProfileOpen(false)}
                user={selectedUser}
            />
        </Box>
    );
}

export default App;
