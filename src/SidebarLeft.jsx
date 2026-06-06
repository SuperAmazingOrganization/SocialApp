import { Box, Button, Avatar, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "./store/tweetSlice.js";

function XdLogoSmall() {
    return (
        <Box sx={{ mb: 3 }}>
            <svg viewBox="0 0 140 80" width="90" height="52">
                <path d="M20 40 Q10 10 40 15 Q60 0 90 15 Q120 5 130 30 Q140 50 120 60 Q110 80 80 75 Q50 85 30 70 Q10 60 20 40Z" fill="#E53935" />
                <text x="70" y="52" textAnchor="middle" fill="white" fontSize="36" fontWeight="900" fontFamily="Arial Black, sans-serif">XD</text>
            </svg>
        </Box>
    );
}

export default function SidebarLeft({ onOpenProfile }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    const avatarUrl = currentUser?.profilePicUrl || `https://i.pravatar.cc/150?u=${currentUser?.id || 'me'}`;
    const displayName = currentUser?.username || 'User';
    const displayEmail = currentUser?.email || '';

    return (
        <Box sx={{
            position: 'sticky',
            top: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            height: 'fit-content',
        }}>
            <XdLogoSmall />

            <Box
                onClick={onOpenProfile}
                sx={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    p: 2.5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    cursor: 'pointer',
                    '&:hover': { background: 'rgba(255, 255, 255, 0.85)' },
                    transition: 'background 0.2s',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <PersonOutlinedIcon sx={{ color: '#555', fontSize: 20 }} />
                    <Typography sx={{ fontWeight: 600, color: '#333', fontSize: '15px' }}>
                        Mój Profil
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar src={avatarUrl} sx={{ width: 44, height: 44 }} />
                    <Box>
                        <Typography sx={{ fontWeight: 600, color: '#222', fontSize: '14px', lineHeight: 1.2 }}>
                            {displayName}
                        </Typography>
                        <Typography sx={{ color: '#888', fontSize: '12px' }}>
                            {displayEmail}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Button
                onClick={() => dispatch(openModal())}
                sx={{
                    py: 1.4,
                    borderRadius: '16px',
                    background: '#E53935',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '15px',
                    textTransform: 'none',
                    boxShadow: '0 4px 14px rgba(229, 57, 53, 0.35)',
                    '&:hover': {
                        background: '#C62828',
                        boxShadow: '0 6px 18px rgba(229, 57, 53, 0.45)',
                    },
                }}
                startIcon={<SendIcon sx={{ fontSize: 18 }} />}
            >
                Post
            </Button>
        </Box>
    );
}
