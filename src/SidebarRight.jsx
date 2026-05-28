import { useEffect, useState } from "react";
import { Box, Button, Avatar, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { useSelector } from "react-redux";
import { followUser, unfollowUser } from "./api.js";
import { useDispatch } from "react-redux";
import { addFollowing, removeFollowing } from "./store/userSlice.js";

const popularHashtags = [
    { tag: '#Rękodzieło', count: 1 },
    { tag: '#Muzyka', count: 1 },
    { tag: '#Sztuka', count: 1 },
];

const cardStyle = {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(12px)',
    borderRadius: '20px',
    border: '1px solid rgba(0,0,0,0.06)',
    p: 2.5,
};

export default function SidebarRight() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const usersCache = useSelector((state) => state.user.usersCache);
    const following = useSelector((state) => state.user.following);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (!currentUser) return;
        const allUsers = Object.values(usersCache);
        const filtered = allUsers.filter(u => u.id !== currentUser.id);
        setSuggestions(filtered.slice(0, 5));
    }, [usersCache, currentUser]);

    const handleFollow = async (targetUserId) => {
        if (!currentUser) return;
        try {
            await followUser(currentUser.id, targetUserId);
            dispatch(addFollowing(targetUserId));
        } catch (e) {
            console.error(e);
        }
    };

    const handleUnfollow = async (targetUserId) => {
        if (!currentUser) return;
        try {
            await unfollowUser(currentUser.id, targetUserId);
            dispatch(removeFollowing(targetUserId));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box sx={{
            position: 'sticky',
            top: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            height: 'fit-content',
        }}>
            <TextField
                fullWidth
                placeholder="Szukaj"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        '& fieldset': { borderColor: 'rgba(0,0,0,0.06)' },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: '#888' }} />
                        </InputAdornment>
                    ),
                }}
            />

            <Box sx={cardStyle}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <TrendingUpIcon sx={{ color: '#555', fontSize: 20 }} />
                    <Typography sx={{ fontWeight: 600, color: '#333', fontSize: '15px' }}>
                        Popularne
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {popularHashtags.map((h) => (
                        <Box key={h.tag} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ color: '#444', fontSize: '14px', fontWeight: 500 }}>
                                {h.tag}
                            </Typography>
                            <Typography sx={{ color: '#999', fontSize: '12px' }}>
                                {h.count} post
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box sx={cardStyle}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <PeopleOutlinedIcon sx={{ color: '#555', fontSize: 20 }} />
                    <Typography sx={{ fontWeight: 600, color: '#333', fontSize: '15px' }}>
                        Sugestie
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {suggestions.map((u) => {
                        const isFollowing = following.includes(u.id);
                        return (
                            <Box key={u.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Avatar src={u.profilePicUrl || `https://i.pravatar.cc/150?u=${u.id}`} sx={{ width: 36, height: 36 }} />
                                    <Box>
                                        <Typography sx={{ fontWeight: 600, color: '#222', fontSize: '13px', lineHeight: 1.2 }}>
                                            {u.username}
                                        </Typography>
                                        <Typography sx={{ color: '#888', fontSize: '11px' }}>
                                            {u.email}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button
                                    size="small"
                                    onClick={() => isFollowing ? handleUnfollow(u.id) : handleFollow(u.id)}
                                    sx={{
                                        minWidth: 'unset',
                                        px: 1.5,
                                        py: 0.4,
                                        borderRadius: '10px',
                                        background: isFollowing ? '#888' : '#E53935',
                                        color: '#fff',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        '&:hover': { background: isFollowing ? '#666' : '#C62828' },
                                    }}
                                >
                                    {isFollowing ? 'obserwujesz' : 'obserwuj'}
                                </Button>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
}
