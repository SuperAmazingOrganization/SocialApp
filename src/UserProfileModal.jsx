import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, IconButton, Avatar, Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { followUser, unfollowUser, getUserFollowing } from "./api.js";
import { useSelector, useDispatch } from "react-redux";
import { addFollowing, removeFollowing } from "./store/userSlice.js";

export default function UserProfileModal({ open, onClose, user }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const following = useSelector((state) => state.user.following);
    const [userFollowingCount, setUserFollowingCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (user?.id) {
            setIsFollowing(following.includes(user.id));
            getUserFollowing(user.id).then(data => {
                setUserFollowingCount(data.length);
            }).catch(() => setUserFollowingCount(0));
        }
    }, [user, following]);

    if (!user) return null;

    const handleFollow = async () => {
        if (!currentUser) return;
        try {
            await followUser(currentUser.id, user.id);
            dispatch(addFollowing(user.id));
            setIsFollowing(true);
        } catch (e) {
            console.error(e);
        }
    };

    const handleUnfollow = async () => {
        if (!currentUser) return;
        try {
            await unfollowUser(currentUser.id, user.id);
            dispatch(removeFollowing(user.id));
            setIsFollowing(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{
                bgcolor: '#fff',
                maxWidth: '380px',
                width: '90%',
                padding: '32px',
                borderRadius: '24px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                position: 'relative',
            }}>
                <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', top: 16, right: 16, color: '#888' }}>
                    <CloseIcon />
                </IconButton>

                <Avatar src={user.profilePicUrl || `https://i.pravatar.cc/150?u=${user.id}`} sx={{ width: 90, height: 90 }} />

                <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#222' }}>
                        {user.username}
                    </Typography>
                    <Typography sx={{ color: '#888', fontSize: '13px' }}>
                        {user.email}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 4, my: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#222' }}>{userFollowingCount}</Typography>
                        <Typography sx={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>obserwujących</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#222' }}>{userFollowingCount}</Typography>
                        <Typography sx={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>obserwowanych</Typography>
                    </Box>
                </Box>

                <Button
                    onClick={isFollowing ? handleUnfollow : handleFollow}
                    sx={{
                        borderRadius: '20px',
                        background: isFollowing ? '#888' : '#E53935',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '14px',
                        textTransform: 'none',
                        px: 4,
                        py: 0.8,
                        '&:hover': {
                            background: isFollowing ? '#666' : '#C62828',
                        },
                    }}
                >
                    {isFollowing ? 'Obserwujesz' : 'Obserwuj'}
                </Button>
            </Box>
        </Modal>
    );
}
