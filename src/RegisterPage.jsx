import { useState } from "react";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router";
import { registerUser } from "./api.js";

function XdLogo() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box sx={{ width: 140, height: 80, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 140 80" width="140" height="80">
                    <path d="M20 40 Q10 10 40 15 Q60 0 90 15 Q120 5 130 30 Q140 50 120 60 Q110 80 80 75 Q50 85 30 70 Q10 60 20 40Z" fill="#E53935" />
                    <text x="70" y="52" textAnchor="middle" fill="white" fontSize="36" fontWeight="900" fontFamily="Arial Black, sans-serif">XD</text>
                </svg>
            </Box>
        </Box>
    );
}

const gradientBg = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #5BCFCF 0%, #A8E6CF 25%, #FFB899 55%, #FF8E72 80%, #FF6B6B 100%)',
    padding: '20px',
};

const glassCard = {
    background: 'rgba(255, 255, 255, 0.55)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderRadius: '28px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
    padding: '40px 40px 48px',
    width: '100%',
    maxWidth: '460px',
    position: 'relative',
};

const inputStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '14px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.6)' },
        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.9)' },
        '&.Mui-focused fieldset': { borderColor: '#FF8A65' },
    },
};

export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function register() {
        try {
            setError('');
            await registerUser({ email, username, password });
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    }

    return (
        <Box sx={gradientBg}>
            <Box sx={glassCard}>
                <IconButton
                    onClick={() => navigate('/login')}
                    sx={{ position: 'absolute', top: 16, right: 16, color: '#555' }}
                >
                    <CloseIcon />
                </IconButton>
                <XdLogo />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <Box>
                        <Typography sx={{ mb: 1, fontWeight: 500, color: '#2d2d2d', fontSize: '16px' }}>
                            Email
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="name@domain.xd"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={inputStyle}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon sx={{ color: '#888' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography sx={{ mb: 1, fontWeight: 500, color: '#2d2d2d', fontSize: '16px' }}>
                            Username
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Jan Kowalski"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={inputStyle}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutlinedIcon sx={{ color: '#888' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography sx={{ mb: 1, fontWeight: 500, color: '#2d2d2d', fontSize: '16px' }}>
                            Password
                        </Typography>
                        <TextField
                            fullWidth
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={inputStyle}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon sx={{ color: '#888' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    {error && (
                        <Typography sx={{ color: '#E53935', fontSize: '14px', textAlign: 'center' }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        onClick={register}
                        sx={{
                            mt: 1,
                            py: 1.4,
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg, #FF9A76 0%, #FF7B7B 100%)',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '16px',
                            textTransform: 'none',
                            boxShadow: '0 4px 16px rgba(255, 123, 123, 0.35)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #FF8A65 0%, #FF6B6B 100%)',
                                boxShadow: '0 6px 20px rgba(255, 107, 107, 0.45)',
                            },
                        }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
