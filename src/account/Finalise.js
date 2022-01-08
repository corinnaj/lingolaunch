import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Select, MenuItem, InputLabel, NativeSelect } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

export default function Finalise({userInfo, updateUserInfo}) {
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [language, setLanguage] = useState(null)
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const [languageList, setLanguageList] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (!languageList)
            loadLanguages()
        if (!user)
            setUser(supabase.auth.user())
    });

    async function loadLanguages() {
        let {data, error} = await supabase
            .from('languages')
            .select('*')
        if (error) {
            setError(error)
        }
        setLanguageList(data)
        setLanguage(data[0].id)
    }

    async function submitHandler(event){
        event.preventDefault();
        setLoading(true)
        try {
            if (!submitted) {
                const updates = {
                    id: user.id,
                    username: username,
                    level: 0,
                    current_language: language,
                    updated_at: new Date(),
                }
                await supabase.from('profiles').upsert(updates, {
                    returning: 'minimal',
                }).then(({error}) => {
                    if (error) throw error
                    setSubmitted(true)
                    updateUserInfo({
                        ...userInfo,
                        status: 'Completed',
                        username: username,
                        language: language,
                        level: 0,
                    })
                    setLoading(false)
                })

            }
        } catch(error) {
            console.log(error)
            setError(error.message)
        }
    }

    function signUpForm(){
        return(
            <>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="Username"
                        name="Username"
                        required
                        fullWidth
                        id="Username"
                        label="Username"
                        autoFocus
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel variant="standard" required htmlFor="uncontrolled-native">
                        Pick the language to study
                    </InputLabel>
                    <NativeSelect
                        inputProps={{
                            name: 'pick the language to study',
                            id: 'uncontrolled-native',
                            defaultValue: {language}
                        }}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        {languageList ? languageList.map((l, k) => {
                            return(<option key={k} value={l.id}>{l.name}</option>)
                        }): <option>loading</option>}
                    </NativeSelect>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                > Complete signup </Button>
            </>
        )
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {loading ? <CircularProgress/> :
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Final step
                    </Typography>
                    <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {!submitted ? signUpForm() : "all set! you are logged in!"}
                        </Grid>
                    </Box>
                </Box>
            }
        </Container>
    )
}