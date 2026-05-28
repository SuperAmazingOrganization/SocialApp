import { Modal, TextField, Box, Typography, Button, IconButton, Avatar } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from "./api.js";
import { closeModal, addTweet } from "./store/tweetSlice.js";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

export default function CreateTweet() {
    const [content, setContent] = useState('');
    const isModalOpen = useSelector((state) => state.tweet.isModalOpen);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (!content.trim() || !currentUser) return;
        const post = await createPost({ body: content, authorId: currentUser.id });
        dispatch(addTweet({ ...post, likes: [], comments: [] }));
        setContent('');
        dispatch(closeModal());
    };

    const avatarUrl = currentUser?.profilePicUrl || `https://i.pravatar.cc/150?u=${currentUser?.id || 'me'}`;
    const displayName = currentUser?.username || 'User';

    return (
        <Modal
            open={isModalOpen}
            onClose={() => dispatch(closeModal())}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box sx={{
                bgcolor: '#fff',
                maxWidth: '520px',
                width: '90%',
                maxHeight: '80vh',
                padding: '28px',
                borderRadius: '24px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                position: 'relative',
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '18px', color: '#222' }}>
                        Nowy Post
                    </Typography>
                    <IconButton onClick={() => dispatch(closeModal())} size="small" sx={{ color: '#888' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar src={avatarUrl} sx={{ width: 40, height: 40 }} />
                    <Typography sx={{ fontWeight: 600, color: '#333', fontSize: '14px' }}>
                        {displayName}
                    </Typography>
                </Box>

                <TextField
                    multiline
                    rows={5}
                    placeholder="Co słychać?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '16px',
                            backgroundColor: '#f8f9fa',
                            '& fieldset': { borderColor: 'transparent' },
                            '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.08)' },
                            '&.Mui-focused fieldset': { borderColor: '#FF8A65' },
                        },
                    }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                    <Typography sx={{ color: '#999', fontSize: '13px' }}>
                        {content.length}/500
                    </Typography>
                    <Button
                        onClick={handleSubmit}
                        disabled={!content.trim()}
                        sx={{
                            borderRadius: '12px',
                            background: '#E53935',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '14px',
                            textTransform: 'none',
                            px: 3,
                            py: 0.8,
                            '&:hover': { background: '#C62828' },
                            '&.Mui-disabled': { background: '#e0e0e0', color: '#999' },
                        }}
                        startIcon={<SendIcon sx={{ fontSize: 16 }} />}
                    >
                        Post
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
