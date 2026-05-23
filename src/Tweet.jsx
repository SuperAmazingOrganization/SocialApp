import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ThumbUp from '@mui/icons-material/ThumbUp';
import Comment from '@mui/icons-material/Comment';
import {likePost, unlikePost} from "./api.js";
import {useDispatch} from "react-redux";
import {likeTweet, unlikeTweet} from "./store/tweetSlice.js";

export default function Tweet({tweet}) {
    const dispatch = useDispatch()

    const likeSendByMe = tweet.likes?.find(like => like.id === 1) // TODO use username instead of 1

    const sendLikePost = async (id) => {
        const data = await likePost(id, 1)  // TODO use userId instead of 1
        dispatch(likeTweet({id, like: data}))
    }

    const sendUnlikePost = async (postId, likeId) => {
        await unlikePost(postId, likeId)
        dispatch(unlikeTweet({id: postId, likeId}))
    }

    const handleLikeClick = () => {
        if (likeSendByMe) {
            sendUnlikePost(tweet.id, likeSendByMe.id)
        } else {
            sendLikePost(tweet.id)
        }
    }

  return (
    <Card sx={{ minWidth: 275, maxWidth: 600 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 20 }}>
          John Doe
        </Typography>
        <Typography variant="body2">
            {tweet.body}
        </Typography>
      </CardContent>
      <CardActions>
          <ThumbUp
              style={{cursor: 'pointer', color: likeSendByMe ? '#4a4': 'inherit'}}
              onClick={handleLikeClick}/>
          <Typography>{tweet.likes?.length ?? 0}</Typography>
          <Comment />
      </CardActions>
    </Card>
  );
}
