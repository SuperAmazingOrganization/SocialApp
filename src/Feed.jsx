import { useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Tweet from './Tweet.jsx'
import {getAllPosts, getPostLikes} from './api.js'
import { loadAll, loadMore, setLoading, setHasMore } from './store/tweetSlice'

const PAGE_SIZE = 2

export default function Feed() {
    const dispatch = useDispatch()
    const tweets = useSelector((state) => state.tweet.tweets)
    const page = useSelector((state) => state.tweet.page)
    const hasMore = useSelector((state) => state.tweet.hasMore)
    const isLoading = useSelector((state) => state.tweet.isLoading)

    const sentinelRef = useRef(null)

    // Initial load
    useEffect(() => {
        const load = async () => {
            dispatch(setLoading(true))
            let data = await getAllPosts(0, PAGE_SIZE)
            for (let i = 0; i < data.length; i++) {
                const likes = await getPostLikes(data[i].id)
                data[i] = {...data[i], likes}
            }
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
        for (let i = 0; i < data.length; i++) {
            const likes = await getPostLikes(data[i].id)
            data[i] = {...data[i], likes}
        }
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

    // Infinite scroll
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
        <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
            {tweets.map((t) => (
                <Grid item size={8} key={t.id}>
                    <Tweet tweet={t} />
                </Grid>
            ))}
            <div ref={sentinelRef} style={{ width: '100%', textAlign: 'center', padding: 16 }}>
                {isLoading && <CircularProgress />}
            </div>
        </Grid>
    )
}
