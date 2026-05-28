import { Modal, TextField, Box, Typography, Button, IconButton, Avatar, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { commentPost, getPostComments } from "./api.js";
import { useDispatch, useSelector } from "react-redux";
import { commentTweet, setComments } from "./store/tweetSlice.js";
import CloseIcon from '@mui/icons-material/Close';

export default function CommentTweetModal({ tweet, open, onClose }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const usersCache = useSelector((state) => state.user.usersCache);
    const [text, setText] = useState('');
    const [localComments, setLocalComments] = useState([]);

    useEffect(() => {
        if (open && tweet?.id) {
            getPostComments(tweet.id).then(data => {
                setLocalComments(data);
                dispatch(setComments({ id: tweet.id, comments: data }));
            }).catch(() => setLocalComments([]));
        }
    }, [open, tweet?.id, dispatch]);

    const sendComment = async () => {
        if (!text.trim() || !currentUser || !tweet) return;
        const data = await commentPost(tweet.id, currentUser.id, text);
        dispatch(commentTweet({ id: tweet.id, comment: data }));
        setLocalComments(prev => [...prev, data]);
        setText('');
    };

    if (!tweet) return null;

    const author = usersCache[tweet.authorId] || {};
    const avatarUrl = author.profilePicUrl || `https://i.pravatar.cc/150?u=${tweet.authorId}`;
    const authorName = author.username || 'Unknown';

    const commentsToShow = localComments.length > 0 ? localComments : (tweet.comments || []);

    return (
        <Modal
            open={open || false}
            onClose={onClose}
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
                        Komentarze
                    </Typography>
                    <IconButton onClick={onClose} size="small" sx={{ color: '#888' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Avatar src={avatarUrl} sx={{ width: 36, height: 36 }} />
                    <Box>
                        <Typography sx={{ fontWeight: 600, color: '#333', fontSize: '14px' }}>
                            {authorName}
                        </Typography>
                        <Typography sx={{ color: '#666', fontSize: '14px', mt: 0.5 }}>
                            {tweet.body}
                        </Typography>
                    </Box>
                </Box>

                <Divider />

                <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5, minHeight: 0 }}>
                    {commentsToShow.length === 0 && (
                        <Typography sx={{ color: '#999', fontSize: '14px', textAlign: 'center', py: 2 }}>
                            Brak komentarzy
                        </Typography>
                    )}
                    {commentsToShow.map((c) => {
                        const commentAuthor = usersCache[c.authorId] || {};
                        return (
                            <Box key={c.id} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                                <Avatar src={commentAuthor.profilePicUrl || `https://i.pravatar.cc/150?u=${c.authorId}`} sx={{ width: 32, height: 32 }} />
                                <Box>
                                    <Typography sx={{ fontWeight: 600, color: '#333', fontSize: '13px' }}>
                                        {commentAuthor.username || 'Unknown'}
                                    </Typography>
                                    <Typography sx={{ color: '#666', fontSize: '13px' }}>
                                        {c.body}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Avatar src={currentUser?.profilePicUrl || `https://i.pravatar.cc/150?u=${currentUser?.id || 'me'}`} sx={{ width: 36, height: 36 }} />
                    <TextField
                        multiline
                        rows={3}
                        placeholder="Napisz komentarz..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
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
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                    <Typography sx={{ color: '#999', fontSize: '13px' }}>
                        {text.length}/200
                    </Typography>
                    <Button
                        onClick={sendComment}
                        disabled={!text.trim()}
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
                    >
                        Opublikuj
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
