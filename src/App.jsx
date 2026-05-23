import './App.css'
import Fab from "@mui/material/Fab";
import Feed from "./Feed.jsx";
import Box from "@mui/material/Box";
import CreateTweet from "./CreateTweet.jsx";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from "react-redux";
import {openModal} from "./store/tweetSlice.js";
import CommentTweetModal from "./CommentTweetModal.jsx";

function App() {
  const dispatch = useDispatch()

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <Feed />
        </Box>
        <Fab
            size="large"
            edge="start"
            color="inherit"
            aria-label="new tweet"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1100
            }}
            onClick={() => dispatch(openModal())}
        >
          <AddIcon />
        </Fab>
        <CreateTweet />
        <CommentTweetModal tweet={{id: 1, body: 'test'}} />
    </>
  )
}

export default App
