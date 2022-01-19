import React, {useEffect, useState} from "react";
import { Typography, Card, CardContent, CardActions, Button, CardHeader, CardMedia, Fab } from '@mui/material';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import { Snackbar, LinearProgress } from '@mui/material';
import { Link, useHistory, useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Article } from "./articles/Article";
import PostAddIcon from '@mui/icons-material/PostAdd';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import {supabase} from "./supabaseClient";
import { Fade } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    article: {
        margin: "16px",
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export function ArticleList({userInfo, updateUserInfo}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const [notification, setNotification] = useState('');
    const { articleId } = useParams();
    const history = useHistory();
    const vertical = 'bottom', horizontal = 'center';
    const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
        setContent('');
    };

    const handleClose = () => {
        setOpen(false);
        setContent('');
    };

    const notificationReset = () => {
        setNotification('')
    }

    useEffect(() => {
        if (userInfo.articles.every((article) => article.completed)) {
            const newLevel = userInfo.level + 1
            setNotification("CONGRATS! you just advanced to level " + newLevel)
            supabase
                .from('profiles')
                .update({ level: newLevel })
                .eq('id', supabase.auth.user().id)
                .then((response) => {
                    updateUserInfo({
                        ...userInfo,
                        level: newLevel,
                        syncArticles: true,
                    })
                })
        }
    });

    const markAsComplete = async (articleId) => {
        setLoading(true)
        await supabase
            .from('progresses')
            .insert([
                { article_id: articleId, user_id: supabase.auth.user().id },
            ]).then((res) => {
                updateUserInfo({
                    ...userInfo,
                    articles: userInfo.articles.map((article) => article.id === articleId ? {...article, completed: true} : article)
                });
                setLoading(false)
                setNotification("CONGRATS! Article completed!")
                history.push("/articles")
            })
    }

    function getArticle(articleId){
        let article = userInfo.articles.find(article => article.id === articleId)
        if(article)
            return(
                <Article title={article.title} image={article.media} onComplete={() => markAsComplete(articleId)}>
                    {article.content}
                </Article>
            )
        return(
            <Grid container spacing={2} alignItems="stretch">
                {userInfo.articles.map((article, i) => {
                   return (
                       <Fade in={!loading} {...(!loading ? { timeout: 200 + 1000 * i } : {})}>
                           <Grid item xs={12} lg={4} md={6} key={i}>
                               {preview(article.title, article.preview, article.link, article.category, article.media, article.id, article.completed)}
                           </Grid>
                       </Fade>
                   )
                })}
            </Grid>
        )
    }

    function preview(title, content, link, category, image, articleId, completed=false) {
        return (
            <Card key={articleId} elevation={4} sx={{ height: '100%' }} className={classes.article}>
                <div className="completed-anchor">
                    <CardMedia image={image} className={completed? 'completed-article': null} component="img" height="160"/>
                    {completed? <span className='completed-banner'>COMPLETED</span>:null}
                </div>
                <CardHeader title={title} subheader={category}/>
                <CardContent>
                    <Typography variant="body1" color="textSecondary">
                        {content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to={"/articles/" + articleId}>
                        <Button size="small" color="primary">
                            Read More
                        </Button>
                    </Link>
                </CardActions>
            </Card >);
    }

    return <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Content</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Insert text of a new article
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="addText"
                    multiline
                    fullWidth
                    value={content}
                    onChange={(event) => { setContent(event.target.value) }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Link to="/articles/myarticle">
                    <Button onClick={() => {
                        localStorage.setItem("myArticle", content);
                        handleClose();
                    }} color="primary">
                        Submit
                    </Button>
                </Link>
            </DialogActions>
        </Dialog>
        {
            loading ? <CircularProgress/> :
                <>
                    {getArticle(parseInt(articleId))}
                    <Snackbar
                        autoHideDuration={3000}
                        anchorOrigin={{vertical, horizontal}}
                        open={Boolean(notification)}
                        onClose={notificationReset}
                        message={notification}
                        key={notification}
                    />
                </>
        }
        <Fab aria-label="import" color="primary" className={classes.fab} onClick={handleClickOpen}>
            <PostAddIcon />
        </Fab>
    </div >
}