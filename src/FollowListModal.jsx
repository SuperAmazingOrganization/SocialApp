import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, IconButton, Avatar, Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { getUserFollowing } from "./api.js";
import { useSelector } from "react-redux";

export default function FollowListModal({ open, onClose, mode, userId }) {
    const title = mode === 'following' ? 'Osoby obserwowani' : 'Osoby obserwujące';
    const usersCache = useSelector((state) => state.user.usersCache);
    const following = useSelector((state) => state.user.following);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (open && userId && mode === 'following') {
            getUserFollowing(userId).then(data => {
                setUsers(data);
            }).catch(() => setUsers([]));
        } else if (open && userId && mode === 'followers') {
            // Backend doesn't have a followers endpoint yet; use following as placeholder
            getUserFollowing(userId).then(data => {
                setUsers(data);
            }).catch(() => setUsers([]));
        }
    }, [open, userId, mode]);

    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{
                bgcolor: '#fff',
                maxWidth: '420px',
                width: '90%',
                maxHeight: '70vh',
                padding: '24px',
                borderRadius: '24px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                position: 'relative',
                overflow: 'auto',
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '17px', color: '#222' }}>
                        {title}
                    </Typography>
                    <IconButton onClick={onClose} size="small" sx={{ color: '#888' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {users.length === 0 && (
                        <Typography sx={{ color: '#999', fontSize: '14px', textAlign: 'center', py: 2 }}>
                            Brak użytkowników
                        </Typography>
                    )}
                    {users.map((u) => (
                        <Box key={u.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Avatar src={u.profilePicUrl || `https://i.pravatar.cc/150?u=${u.id}`} sx={{ width: 40, height: 40 }} />
                                <Box>
                                    <Typography sx={{ fontWeight: 600, color: '#222', fontSize: '14px' }}>
                                        {u.username}
                                    </Typography>
                                    <Typography sx={{ color: '#888', fontSize: '12px' }}>
                                        {u.email}
                                    </Typography>
                                </Box>
                            </Box>
                            <Button
                                size="small"
                                sx={{
                                    minWidth: 'unset',
                                    px: 2,
                                    py: 0.4,
                                    borderRadius: '12px',
                                    background: following.includes(u.id) ? '#888' : '#E53935',
                                    color: '#fff',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    '&:hover': {
                                        background: following.includes(u.id) ? '#666' : '#C62828',
                                    },
                                }}
                            >
                                {following.includes(u.id) ? 'Obserwujesz' : 'Obserwuj'}
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Modal>
    );
}
