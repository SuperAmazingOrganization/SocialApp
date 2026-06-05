import { useEffect, useRef, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress, TextField, Avatar, Typography, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Tweet from './Tweet.jsx'
import { getAllPosts, getPostLikes, searchUsers } from './api.js'
import { loadAll, loadMore, setLoading, setHasMore } from './store/tweetSlice'
import { cacheUsers } from './store/userSlice.js'
import SidebarLeft from './SidebarLeft.jsx'
import SidebarRight from './SidebarRight.jsx'

const PAGE_SIZE = 5

export default function Feed({ onOpenProfile, onOpenUserProfile }) {
    const dispatch = useDispatch()
    const tweets = useSelector((state) => state.tweet.tweets)
    const page = useSelector((state) => state.tweet.page)
    const hasMore = useSelector((state) => state.tweet.hasMore)
    const isLoading = useSelector((state) => state.tweet.isLoading)
    const usersCache = useSelector((state) => state.user.usersCache)
    const sentinelRef = useRef(null)

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const searchTimerRef = useRef(null);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
        searchTimerRef.current = setTimeout(async () => {
            setSearching(true);
            try {
                const users = await searchUsers(searchQuery.trim());
                setSearchResults(Array.isArray(users) ? users : []);
                if (Array.isArray(users)) dispatch(cacheUsers(users));
            } catch (e) {
                setSearchResults([]);
            } finally {
                setSearching(false);
            }
        }, 300);
        return () => {
            if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
        };
    }, [searchQuery, dispatch]);

    const enrichPosts = async (posts) => {
        if (!Array.isArray(posts)) return [];
        const enriched = [];
        for (const post of posts) {
            let likes = [];
            try {
                likes = await getPostLikes(post.id);
            } catch (e) {
                // ignore
            }
            enriched.push({ ...post, likes });
        }
        return enriched;
    };

    useEffect(() => {
        const load = async () => {
            dispatch(setLoading(true))
            let data = await getAllPosts(0, PAGE_SIZE)
            data = await enrichPosts(data)
            dispatch(loadAll(data))
            if (data.length < PAGE_SIZE) {
                dispatch(setHasMore(false))
            }
            dispatch(setLoading(false))
        }
        load()
    }, [dispatch])

    const loadNext = useCallback(async () => {
        if (isLoading) return
        dispatch(setLoading(true))
        const nextPage = page + 1
        let data = await getAllPosts(nextPage, PAGE_SIZE)
        data = await enrichPosts(data)
        if (data.length > 0) {
            const existingIds = new Set(tweets.map((t) => t.id))
            const allDuplicates = data.every((t) => existingIds.has(t.id))
            if (!allDuplicates) {
                dispatch(loadMore(data))
            }
            if (data.length < PAGE_SIZE || allDuplicates) {
                dispatch(setHasMore(false))
            }
        } else {
            dispatch(setHasMore(false))
        }
        dispatch(setLoading(false))
    }, [dispatch, page, isLoading, tweets])

    useEffect(() => {
        if (isLoading || !hasMore) return
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    observer.disconnect()
                    loadNext()
                }
            },
            { rootMargin: '200px' }
        )
        if (sentinelRef.current) observer.observe(sentinelRef.current)
        return () => observer.disconnect()
    }, [page, isLoading, hasMore, loadNext])

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr 280px',
            gap: 3,
            maxWidth: '1200px',
            margin: '0 auto',
            px: 2,
            py: 3,
            minHeight: '100vh',
            '@media (max-width: 1024px)': {
                gridTemplateColumns: '1fr',
            },
        }}>
            <Box sx={{ '@media (max-width: 1024px)': { display: 'none' } }}>
                <SidebarLeft onOpenProfile={onOpenProfile} />
            </Box>

            <Box sx={{ background: 'rgba(255,255,255,0.6)', borderRadius: '20px', px: 2, backdropFilter: 'blur(8px)' }}>
                <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderRadius: '16px', my: 1, py: 1.5, px: 2 }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Szukaj użytkowników..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#888' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                backgroundColor: '#f0f2f5',
                                '& fieldset': { borderColor: 'transparent' },
                                '&.Mui-focused fieldset': { borderColor: '#FF8A65' },
                            },
                        }}
                    />
                    {searchQuery.trim() && (
                        <Box sx={{ mt: 1, maxHeight: '320px', overflowY: 'auto' }}>
                            {searching && (
                                <Box sx={{ p: 2, textAlign: 'center' }}>
                                    <CircularProgress size={20} sx={{ color: '#E53935' }} />
                                </Box>
                            )}
                            {!searching && searchResults.length === 0 && (
                                <Typography sx={{ p: 2, textAlign: 'center', color: '#888', fontSize: '14px' }}>
                                    Brak wyników
                                </Typography>
                            )}
                            {searchResults.map((u) => (
                                <Box
                                    key={u.id}
                                    onClick={() => { onOpenUserProfile?.(u); setSearchQuery(''); setSearchResults([]); }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        p: 1.2,
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                                    }}
                                >
                                    <Avatar src={u.profilePicUrl || `https://i.pravatar.cc/150?u=${u.id}`} sx={{ width: 40, height: 40 }} />
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#222' }}>{u.username}</Typography>
                                        <Typography sx={{ fontSize: '12px', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.email}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
                {tweets.map((t) => (
                    <Tweet key={t.id} tweet={t} onOpenUserProfile={onOpenUserProfile} />
                ))}
                <Box ref={sentinelRef} sx={{ width: '100%', textAlign: 'center', py: 3 }}>
                    {isLoading && <CircularProgress size={28} sx={{ color: '#E53935' }} />}
                </Box>
            </Box>

            <Box sx={{ '@media (max-width: 1024px)': { display: 'none' } }}>
                <SidebarRight />
            </Box>
        </Box>
    )
}
