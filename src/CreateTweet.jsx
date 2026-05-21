import Box from '@mui/material/Box';
import {Modal, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import Button from "@mui/material/Button";

export default function CreateTweet() {
    const [chars, setChars] = useState(0)

    return (
            <Modal
                open={true}
                // open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Grid container style={{background: '#fff'}}>
                    <Grid size={8}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create new tweet
                        </Typography>
                    </Grid>
                    <Grid size={8}>
                        <Typography>
                            {chars} characters
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            rows={12}
                            defaultValue="Default Value"
                            onInput={(e) => setChars(e.target.value.length)}
                        />
                    </Grid>
                    <Grid size={8}>
                        <Button>Wyślij</Button>
                    </Grid>
                </Grid>
            </Modal>
    );
}
