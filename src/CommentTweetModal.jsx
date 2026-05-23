import {Divider, IconButton, Modal, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";
import {commentPost} from "./api.js";
import {useDispatch} from "react-redux";
import {commentTweet} from "./store/tweetSlice.js";

export default function CommentTweetModal({tweet}) {
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const sendComment = async () => {
        const data = await commentPost(tweet.id, 1, text)  // TODO use userId instead of 1
        dispatch(commentTweet({id: tweet.id, comment: data}))
    }

    return (
        <Modal
            open={false}
            // onClose={() => dispatch({type: 'tweet/closeModal'})}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Stack
                direction="column"
                sx={{
                    bgcolor: '#fff',
                    maxWidth: '500px',
                    width: '500px',
                    maxHeight: '80vh',
                    padding: '24px',
                    borderRadius: 1
                }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography sx={{color: '#000'}} variant="h6" component="h2">
                        Komentarze
                    </Typography>
                    <IconButton aria-label="close" size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <Typography sx={{color: '#000'}}>
                    John Doe
                </Typography>
                <Typography sx={{color: '#000'}}>
                    {tweet.body}
                </Typography>
                <TextField
                    id="outlined-multiline-static"
                    placeholder="Napisz komentarz..."
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    value={text}
                    onInput={(e) => setText(e.target.value)}
                    fullWidth
                />
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    <Typography>
                        {text.length}/200 characters
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={sendComment}
                    >Opublikuj</Button>
                </Box>
            </Stack>
        </Modal>
    )
}
