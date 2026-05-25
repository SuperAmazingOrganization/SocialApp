import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import {TextField, Alert} from "@mui/material";
import {useState} from "react";
import Grid from "@mui/material/Grid";
import FormLabel from '@mui/material/FormLabel';
import {useDispatch} from "react-redux";
import {getToken, getCurrentUser} from "./api.js";
import {setUser} from "./store/userSlice.js";
import {useNavigate} from "react-router";

export default function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function login() {
        setError('')
        try {
            const response = await getToken(username, password)
            localStorage.setItem('accessToken', response.accessToken)
            const user = await getCurrentUser()
            dispatch(setUser({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                username: user.username
            }))
            navigate('/')
        } catch (e) {
            setError(e?.message || e?.title || 'Invalid credentials')
        }
    }

    return (
        <Grid container style={{paddingTop: '200px'}}>
            <Grid item xs={12} sx={{margin: 'auto'}}>
                <Card sx={{ minWidth: 500, maxWidth: 600, padding: '24px' }}>
                    <CardContent style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px'}}>
                            <FormLabel>Email or username</FormLabel>
                            <TextField
                                id="username"
                                rows={4}
                                placeholder="name@domain.xd"
                                onInput={(e) => setUsername(e.target.value)}
                                value={username}
                                fullWidth
                            />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px'}}>
                            <FormLabel>Password</FormLabel>
                            <TextField
                                id="password"
                                rows={4}
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
                            onClick={() => login()}
                        >Login</Button>
                    </CardActions>
                    <Typography variant="body2" color="text.secondary" align="center">
                        New user? <a href="/register">Create an account!</a>
                    </Typography>
                </Card>
            </Grid>
        </Grid>
    )
}
