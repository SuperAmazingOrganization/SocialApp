import Tweet from './Tweet.jsx'
import Grid from '@mui/material/Grid'
import {getAllPosts} from "./api.js";
import { useSelector, useDispatch } from 'react-redux'
import { loadAll } from './store/tweetSlice'
import {useEffect} from "react";

export default function Feed() {
    const dispatch = useDispatch()
    useEffect(() => {
        const loadTweets = async () => {
            const tweets = await getAllPosts();
            dispatch(loadAll(tweets)) //wrzuci pobrane tweety do store Reduxa
        }
        loadTweets()
    }, [])


    return (
        <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
        >
            {['Tweet1', 'Tweet2', 'Tweet3'].map(t =>
                <Grid size={8}>
                    <Tweet title={t}/>
                </Grid>)}
        </Grid>
    );
}
