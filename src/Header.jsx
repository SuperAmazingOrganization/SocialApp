import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useSelector, useDispatch} from "react-redux";
import {logout} from "./store/userSlice.js";
import {useNavigate} from "react-router";

export default function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = useSelector((state) => state.user.userId)
    const username = useSelector((state) => state.user.username)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <Box>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    {userId ? (
                        <>
                            <Typography variant="body1" sx={{ mr: 2 }}>
                                {username}
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
