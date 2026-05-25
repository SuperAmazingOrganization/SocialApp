import { useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress } from '@mui/material'
import Tweet from './Tweet.jsx'
import { getAllPosts, getPostLikes } from './api.js'
import { loadAll, loadMore, setLoading, setHasMore } from './store/tweetSlice'
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
