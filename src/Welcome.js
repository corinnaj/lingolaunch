import * as React from 'react';
import Box from '@mui/material/Box';
import TextTransition, { presets } from "react-text-transition";
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {Grid, Link} from "@mui/material";
import {width} from "@mui/system";
import {useEffect, useState, useRef} from "react";
import {supabase} from "./supabaseClient";
import CircularProgress from '@mui/material/CircularProgress';

export default function Welcome() {

    const [index, setIndex] = React.useState(0);
    const [loading, setLoading] = useState(true)
    const [languages, setLanguages] = useState(null)
    const [error, setError] = useState(null)
    const itemsRef = useRef([]);

    async function loadLanguages() {
        setLoading(true)
        let {data, error} = await supabase
            .from('languages')
            .select('*')
        if (error) {
            setError(error)
        }
        setLanguages(Array.from(data.map((k, v) => {return k.name})))
        setLoading(false)
    }

    React.useEffect(() => {
        if (!languages)
            loadLanguages()

        const intervalId = setInterval(() => {
            if(languages) {
                itemsRef.current[index % languages.length].pause();
                itemsRef.current[(index + 1) % languages.length].play();
            }
            setIndex(index => index + 1);
        }, 3000);
        return () => clearTimeout(intervalId);
    }, [index, languages]);

    return (
        <Container component="main">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    borderColor: 'white',
                    padding: 3,
                    border: 2,
                    color: "white"
                }}
            >
                {loading ? <CircularProgress/> :
                    <>

                        {/*<Clip url={languages[index % languages.length]}/>*/}
                        <Typography variant="h2" sx={{mb: 3.5, fontWeight: 600}} component="div">
                            LingoLaunch
                        </Typography>

                        {
                            languages.map((language, idx) => {
                                return(
                                    <Box component="div" key={idx} sx={{ display: ((index % languages.length) === idx) ? '': 'none'}}>
                                        <div className="video-container">
                                            <video ref={el => itemsRef.current[idx] = el} autoPlay muted loop>
                                                <source src={"backgrounds/" + language + ".mp4"} type="video/mp4"/>
                                            </video>
                                        </div>
                                    </Box>
                                )
                            })
                        }

                        <Typography variant="h4" sx={{mb: 3.5}}>
                            Start leaning <TextTransition
                            text={languages[index % languages.length]}
                            springConfig={presets.wobbly}
                            inline
                        /> today in a <strong>brand new way.</strong>
                        </Typography>

                        <Typography variant="h6" sx={{mb: 4.5}}>
                            Lingo uses the concept of <i>partial translations</i> to make you
                            learn a language by context, like children. <br/>
                            On each level you acquire new words and grammar from your favourite country's literature,
                            history and recipes book. So you also dive into its real culture. <br/>
                        </Typography>
                        <Typography variant="h5" sx={{mb: 1.5}}>
                            We are Lingo, <Link href="/signup" color={"#FFF"} fontWeight={700}>join us.</Link> <br/>
                        </Typography>
                        <Typography variant="h6">
                            Already have an account? <Link href="/login" color={"#FFF"} fontWeight={700}>Login.</Link>
                        </Typography>
                    </>
                }
            </Box>
        </Container>
    )
}

// alternative way - probably less efficient because we unmount the video tag every time
// function Clip({ url }) {
//     const videoRef = useRef();
//     const previousUrl = useRef(url);
//
//     useEffect(() => {
//         if (previousUrl.current === url) {
//             return;
//         }
//
//         if (videoRef.current) {
//             videoRef.current.load();
//         }
//
//         previousUrl.current = url;
//     }, [url]);
//
//     return (
//         <div className="video-container">
//             <video autoPlay muted loop className="videoPlayer" ref={videoRef}>
//                 <source src={"backgrounds/" + url + ".mp4"} type="video/mp4"/>
//             </video>
//         </div>
//     );
// }