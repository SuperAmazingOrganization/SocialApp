import { Box, Avatar, Typography, Chip } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import { likePost, unlikePost } from "./api.js";
import { useDispatch, useSelector } from "react-redux";
import { likeTweet, unlikeTweet } from "./store/tweetSlice.js";

export default function Tweet({ tweet, onOpenUserProfile }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const usersCache = useSelector((state) => state.user.usersCache);

    const author = usersCache[tweet.authorId] || {};
    const likeSendByMe = tweet.likes?.find(like => like.id === currentUser?.id);

    const sendLikePost = async (id) => {
        if (!currentUser) return;
        const data = await likePost(id, currentUser.id);
        dispatch(likeTweet({ id, user: data }));
    };

    const sendUnlikePost = async (postId) => {
        if (!currentUser) return;
        await unlikePost(postId, currentUser.id);
        dispatch(unlikeTweet({ id: postId, userId: currentUser.id }));
    };

    const handleLikeClick = () => {
        if (likeSendByMe) {
            sendUnlikePost(tweet.id);
        } else {
            sendLikePost(tweet.id);
        }
    };

    const hashtags = tweet.body?.match(/#[\wąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+/g) || [];
    const bodyText = tweet.body?.replace(/#[\wąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+/g, '').trim();

    const avatarUrl = author.profilePicUrl || `https://i.pravatar.cc/150?u=${tweet.authorId}`;
    const authorName = author.username || 'Unknown';
    const authorEmail = author.email || '';

    return (
        <Box sx={{
            display: 'flex',
            gap: 2,
            py: 2.5,
            px: 1,
            borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}>
            <Avatar
                src={avatarUrl}
                sx={{ width: 48, height: 48, flexShrink: 0, cursor: 'pointer' }}
                onClick={() => onOpenUserProfile?.(author)}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 0.5 }}>
                    <Typography
                        sx={{ fontWeight: 600, color: '#222', fontSize: '15px', cursor: 'pointer' }}
                        onClick={() => onOpenUserProfile?.(author)}
                    >
                        {authorName}
                    </Typography>
                    <Typography sx={{ color: '#888', fontSize: '13px' }}>
                        {authorEmail}
                    </Typography>
                </Box>
                <Typography sx={{ color: '#333', fontSize: '15px', lineHeight: 1.5, mb: 1.5, wordBreak: 'break-word' }}>
                    {bodyText || tweet.body}
                </Typography>
                {hashtags.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                        {hashtags.map(tag => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{
                                    backgroundColor: '#E8E8E8',
                                    color: '#555',
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    borderRadius: '10px',
                                    height: '28px',
                                    '& .MuiChip-label': { px: 1.2 },
                                }}
                            />
                        ))}
                    </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, cursor: 'pointer' }} onClick={handleLikeClick}>
                        <ThumbUpOutlinedIcon sx={{
                            fontSize: 20,
                            color: likeSendByMe ? '#E53935' : '#666',
                            transition: 'color 0.2s',
                        }} />
                        <Typography sx={{ color: '#666', fontSize: '14px', fontWeight: 500 }}>
                            {tweet.likes?.length ?? 0}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, cursor: 'pointer' }}>
                        <ChatBubbleOutlinedIcon sx={{ fontSize: 18, color: '#666' }} />
                        <Typography sx={{ color: '#666', fontSize: '14px', fontWeight: 500 }}>
                            {tweet.comments?.length ?? 0}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
