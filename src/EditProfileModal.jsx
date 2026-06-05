import { Modal, Box, Typography, Button, IconButton, TextField, Avatar } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { updateUser } from "./api.js";
import { setCurrentUser, cacheUser } from "./store/userSlice.js";

export default function EditProfileModal({ open, onClose }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    const [description, setDescription] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState('');
    const [backgroundPic, setBackgroundPic] = useState(null);
    const [backgroundPicPreview, setBackgroundPicPreview] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const profileInputRef = useRef(null);
    const backgroundInputRef = useRef(null);

    useEffect(() => {
        if (currentUser && open) {
            setDescription(currentUser.description || '');
            setUsername(currentUser.username || '');
            setEmail(currentUser.email || '');
            setProfilePic(null);
            setBackgroundPic(null);
            setProfilePicPreview(currentUser.profilePicUrl || '');
            setBackgroundPicPreview(currentUser.backgroundPicUrl || '');
            setError('');
        }
    }, [currentUser, open]);

    const handleProfilePicChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePic(file);
            setProfilePicPreview(URL.createObjectURL(file));
        }
    };

    const handleBackgroundPicChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setBackgroundPic(file);
            setBackgroundPicPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        if (!currentUser?.id) return;
        setSaving(true);
        setError('');
        try {
            const data = {};
            if (description !== (currentUser.description || '')) data.description = description;
            if (username !== (currentUser.username || '')) data.username = username;
            if (email !== (currentUser.email || '')) data.email = email;

            const updated = await updateUser(currentUser.id, data, profilePic, backgroundPic);
            dispatch(setCurrentUser(updated));
            dispatch(cacheUser(updated));
            onClose?.();
        } catch (e) {
            setError(e?.exceptions?.[0]?.message || e?.message || 'Nie udało się zapisać profilu');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{
                bgcolor: '#fff',
                maxWidth: '420px',
                width: '90%',
                maxHeight: '90vh',
                overflowY: 'auto',
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

                <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#222' }}>Edytuj profil</Typography>

                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#555', mb: 1 }}>Zdjęcie w tle</Typography>
                    <Box
                        onClick={() => backgroundInputRef.current?.click()}
                        sx={{
                            width: '100%',
                            height: '110px',
                            borderRadius: '12px',
                            backgroundImage: backgroundPicPreview ? `url(${backgroundPicPreview})` : 'linear-gradient(135deg, #FF8E72, #FF6B6B)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px dashed #ddd',
                            '&:hover': { borderColor: '#E53935' },
                        }}
                    >
                        {!backgroundPicPreview && <PhotoCameraIcon sx={{ color: '#fff', fontSize: 32 }} />}
                    </Box>
                    <input ref={backgroundInputRef} type="file" accept="image/*" hidden onChange={handleBackgroundPicChange} />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: -8 }}>
                    <Box
                        onClick={() => profileInputRef.current?.click()}
                        sx={{
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                    >
                        <Avatar
                            src={profilePicPreview || `https://i.pravatar.cc/150?u=${currentUser?.id}`}
                            sx={{ width: 96, height: 96, border: '4px solid #fff' }}
                        />
                        <Box sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            bgcolor: '#E53935',
                            borderRadius: '50%',
                            width: 30,
                            height: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '3px solid #fff',
                        }}>
                            <PhotoCameraIcon sx={{ color: '#fff', fontSize: 16 }} />
                        </Box>
                    </Box>
                    <input ref={profileInputRef} type="file" accept="image/*" hidden onChange={handleProfilePicChange} />
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#555', mb: 0.8 }}>Nazwa użytkownika</Typography>
                    <TextField
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={inputStyle}
                    />
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#555', mb: 0.8 }}>Email</Typography>
                    <TextField
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={inputStyle}
                    />
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#555', mb: 0.8 }}>Opis</Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                        placeholder="Napisz coś o sobie..."
                        sx={inputStyle}
                    />
                    <Typography sx={{ fontSize: '11px', color: '#999', mt: 0.5, textAlign: 'right' }}>
                        {description.length}/500
                    </Typography>
                </Box>

                {error && (
                    <Typography sx={{ fontSize: '13px', color: '#E53935', textAlign: 'center' }}>{error}</Typography>
                )}

                <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center', mt: 1 }}>
                    <Button
                        onClick={onClose}
                        disabled={saving}
                        sx={cancelButtonStyle}
                    >
                        Anuluj
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        sx={saveButtonStyle}
                    >
                        {saving ? 'Zapisywanie...' : 'Zapisz'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

const inputStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        backgroundColor: '#f8f9fa',
        '& fieldset': { borderColor: 'transparent' },
        '&.Mui-focused fieldset': { borderColor: '#FF8A65' },
    },
};

const cancelButtonStyle = {
    borderRadius: '20px',
    background: '#888',
    color: '#fff',
    fontWeight: 600,
    fontSize: '14px',
    textTransform: 'none',
    px: 3,
    py: 0.8,
    '&:hover': { background: '#666' },
    '&:disabled': { opacity: 0.6 },
};

const saveButtonStyle = {
    borderRadius: '20px',
    background: '#E53935',
    color: '#fff',
    fontWeight: 600,
    fontSize: '14px',
    textTransform: 'none',
    px: 3,
    py: 0.8,
    '&:hover': { background: '#C62828' },
    '&:disabled': { opacity: 0.6 },
};
