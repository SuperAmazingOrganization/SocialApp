import {Modal, TextField, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from 'react-redux'
import {createPost} from "./api.js";

export default function CreateTweet() {
    const [content, setContent] = useState('')
    const isModalOpen = useSelector((state) => state.tweet.isModalOpen)
    const userId = useSelector((state) => state.user.userId)
    const dispatch = useDispatch()

    return (
            <Modal
                open={isModalOpen}
                onClose={() => dispatch({type: 'tweet/closeModal'})}
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create new tweet
                    </Typography>
                    <Typography>
                        {content.length} characters
                    </Typography>
                    <TextField
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        onInput={(e) => setContent(e.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        onClick={() => createPost({
                            body: content,
                            authorId: userId
                        })}
                    >Wyślij</Button>
                </Stack>
            </Modal>
    );
}
