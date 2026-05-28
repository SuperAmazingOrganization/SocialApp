import { Modal, Box, Typography, Button, IconButton, Avatar, Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";

export default function ProfileModal({ open, onClose, onEdit, onLogout, onOpenFollowers }) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const following = useSelector((state) => state.user.following);

    if (!currentUser) return null;

    const avatarUrl = currentUser.profilePicUrl || `https://i.pravatar.cc/150?u=${currentUser.id}`;

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

                <Avatar src={avatarUrl} sx={{ width: 90, height: 90 }} />

                <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#222' }}>
                        {currentUser.username}
                    </Typography>
                    <Typography sx={{ color: '#888', fontSize: '13px' }}>
                        {currentUser.email}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 4, my: 1 }}>
                    <Box sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => onOpenFollowers?.('followers')}>
                        <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#222' }}>{following.length}</Typography>
                        <Typography sx={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>obserwujących</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => onOpenFollowers?.('following')}>
                        <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#222' }}>{following.length}</Typography>
                        <Typography sx={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>obserwowanych</Typography>
                    </Box>
                </Box>

                <Button
                    onClick={onEdit}
                    sx={{
                        borderRadius: '20px',
                        background: '#E53935',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '14px',
                        textTransform: 'none',
                        px: 4,
                        py: 0.8,
                        '&:hover': { background: '#C62828' },
                    }}
                >
                    Edytuj profil
                </Button>

                <Typography
                    onClick={onLogout}
                    sx={{
                        color: '#E53935',
                        fontSize: '13px',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        '&:hover': { color: '#C62828' },
                    }}
                >
                    wyloguj
                </Typography>
            </Box>
        </Modal>
    );
}
