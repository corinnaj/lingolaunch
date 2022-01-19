import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link as RouterLink} from "react-router-dom";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp({userInfo, updateUserInfo}) {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')

    async function submitHandler(event){
        event.preventDefault();
        setLoading(true)
        try {
            if (userInfo.status === 'Guest') {
                // TODO: check if fields are filled client-side
                // TODO: check if email is already used and throw error
                let {user} = await supabase.auth.signUp({
                    email: email,
                    password: password,
                    }, { redirectTo: "http://localhost:3000/finalise" }
                )
                if (user) updateUserInfo({status: 'ToVerify', syncUser:true})
            }
        } catch(error) {
            setError(error.message)
            setLoading(false)
        }
    }

    function signUpForm(){
        return(
                <>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="email"
                        name="email"
                        required
                        fullWidth
                        id="email"
                        label="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                > Sign Up </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/login" variant="body2">
                            Already have an account? Login
                        </Link>
                    </Grid>
                </Grid>
                </>
        )
    }

    function emailSentSection(){
        return(
            <p>
                <strong>All set!</strong> please check your email for activation link to start using Lingo today <br/>
            </p>
        )
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {loading ? <CircularProgress/> :
                        <>
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            {userInfo.status === 'Guest' ? <TagFacesIcon/> : <ForwardToInboxIcon/>}
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={submitHandler} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            {userInfo.status === 'Guest' ? signUpForm() : emailSentSection()}
                        </Grid>
                        <Grid mt={3} xs={12}>
                            {error ? <Alert severity="error">{error}</Alert>: ''}
                        </Grid>
                        </Box>
                        </>
                    }
                </Box>
        </Container>
    )
}