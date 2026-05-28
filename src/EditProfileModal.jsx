import { Modal, Box, Typography, Button, IconButton, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function EditProfileModal({ open, onClose, onSave }) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (currentUser) {
            setNickname(currentUser.username || '');
            setEmail(currentUser.email || '');
        }
    }, [currentUser, open]);

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
                gap: 2.5,
                position: 'relative',
            }}>
                <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', top: 16, right: 16, color: '#888' }}>
                    <CloseIcon />
                </IconButton>

                <Box sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    border: '2px dashed #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    '&:hover': { borderColor: '#E53935' },
                }}>
                    <AccountCircleOutlinedIcon sx={{ fontSize: 40, color: '#999' }} />
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#555', mb: 0.8 }}>Nickname</Typography>
                    <TextField
                        fullWidth
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: '#f8f9fa',
                                '& fieldset': { borderColor: 'transparent' },
                                '&.Mui-focused fieldset': { borderColor: '#FF8A65' },
                            },
                        }}
                    />
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#555', mb: 0.8 }}>Poczta</Typography>
                    <TextField
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: '#f8f9fa',
                                '& fieldset': { borderColor: 'transparent' },
                                '&.Mui-focused fieldset': { borderColor: '#FF8A65' },
                            },
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center', mt: 1 }}>
                    <Button
                        onClick={onClose}
                        sx={{
                            borderRadius: '20px',
                            background: '#888',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '14px',
                            textTransform: 'none',
                            px: 3,
                            py: 0.8,
                            '&:hover': { background: '#666' },
                        }}
                    >
                        Anuluj
                    </Button>
                    <Button
                        onClick={() => onSave?.({ nickname, email })}
                        sx={{
                            borderRadius: '20px',
                            background: '#E53935',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '14px',
                            textTransform: 'none',
                            px: 3,
                            py: 0.8,
                            '&:hover': { background: '#C62828' },
                        }}
                    >
                        Zapisz
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
