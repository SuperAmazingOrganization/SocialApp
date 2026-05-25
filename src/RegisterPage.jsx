import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import {TextField, Alert} from "@mui/material";
import {useState} from "react";
import Grid from "@mui/material/Grid";
import FormLabel from '@mui/material/FormLabel';
import {useNavigate} from "react-router";
import {registerUser} from "./api.js";

export default function RegisterPage() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function register() {
        setError('')
        try {
            await registerUser({username, email, password})
            navigate('/login')
        } catch (e) {
            setError(e?.message || e?.title || 'Something went wrong')
        }
    }

    return (
        <Grid container style={{paddingTop: '200px'}}>
            <Grid item xs={12} sx={{margin: 'auto'}}>
                <Card sx={{ minWidth: 500, maxWidth: 600, padding: '24px' }}>
                    <CardContent style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px'}}>
                            <FormLabel>Username</FormLabel>
                            <TextField
                                placeholder="john_doe"
                                onInput={(e) => setUsername(e.target.value)}
                                value={username}
                                fullWidth
                            />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px'}}>
                            <FormLabel>Email</FormLabel>
                            <TextField
                                type="email"
                                placeholder="name@domain.xd"
                                onInput={(e) => setEmail(e.target.value)}
                                value={email}
                                fullWidth
                            />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px'}}>
                            <FormLabel>Password</FormLabel>
                            <TextField
                                type="password"
                                placeholder="********"
                                onInput={(e) => setPassword(e.target.value)}
                                value={password}
                                fullWidth
                            />
                        </div>
                    </CardContent>
                    <CardActions sx={{justifyContent: 'center'}}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => register()}
                        >Register</Button>
                    </CardActions>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Already have an account? <a href="/login">Login!</a>
                    </Typography>
                </Card>
            </Grid>
        </Grid>
    )
}
