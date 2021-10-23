import React from "react";
import { Typography, Card, CardContent, CardActions, Button, CardHeader, CardMedia, Fab } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { capitainBluebearImage } from "./articles/CapitainBluebear";
import { tippingImage } from "./articles/Tipping";
import { applePieImage } from "./articles/ApplePie";
import { Article } from "./articles/Article";
import { kangarooImage } from "./articles/Kangaroo";
import { germanImage } from "./articles/Characteristics";
import { spaetzleImage } from "./articles/ASortOfPasta";
import PostAddIcon from "@material-ui/icons/PostAdd";

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

function fetch_articles(user_id = 0) {
    /**
     * this function emulates an API response. replace this with an ajax request once you have a backend.
     * SEND user id from session
     * API recovers two information:
     * 1. select USER.level, USER.complete_articles from USER where USER.id == ID
     * 2. select * from ARTICLES where ARTICLES.level == USER.level
     * return a list of articles with an additional bool flag if each article is completed
     */
    return [
        {
            'id': 0,
            'completed': true,
            'title': 'Apple Pie',
            'content': 'German Apple Cake is a traditional German dessert that is so easy to make even if you aren’t totally kitchen confident! With a simple batter that rises up and bakes around the apples this easy apple coffee cake is the perfect everyday dessert that tastes best with a dollop of whipped cream on top.',
            'link': 'applepie',
            'category': 'Recipes',
            'media': applePieImage,
        },
        {
            'id': 1,
            'completed': true,
            'title': 'German Characteristics',
            'content': 'It is true that many Germans tend to place punctuality as a high priority. Hence the global observation that German trains often run perfectly on time.',
            'link': 'characteristics',
            'category': 'Cultural Tips',
            'media': germanImage
        },
        {
            'id': 2,
            'completed': false,
            'title': 'Capitain Bluebear',
            'content': 'The 13​¹⁄₂ Lives of Captain Bluebear is a 1999 fantasy novel by German writer and cartoonist Walter Moers which details the numerous lives of a human-sized bear with blue fur.',
            'link': 'bluebear',
            'category': 'Media',
            'media': capitainBluebearImage
        },
        {
            'id': 3,
            'completed': false,
            'title': 'The Kangaroo Chronicles',
            'content': 'Marc-Uwe Kling writes funny songs and stories. His business model is to write books that fiercely criticize capitalism and sell incredibly well.',
            'link': 'kangaroo',
            'category': 'Media',
            'media': kangarooImage
        },
        {
            'id': 4,
            'completed': false,
            'title': 'Tipping Tips',
            'content': 'Tipping in Germany and tipping in some other countries, such as the United States, are totally different.',
            'link': 'tipping',
            'category': 'Cultural Tips',
            'media': tippingImage
        }
    ]
}

export function ArticleList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState('');
    const [articles, setArticles] = React.useState(fetch_articles())
    const { article_id } = useParams()

    const handleClickOpen = () => {
        setOpen(true);
        setContent('');
    };

    const handleClose = () => {
        setOpen(false);
        setContent('');
    };

    const markAsComplete = (article_id) => {
        alert("this was marked as completed: " + article_id);
    }

    function get_article(article_id){
        let article = articles.find(article => article.id == article_id)
        if(article)
            return(
                <Article title={article.title} image={article.media}>
                    {article.content}
                </Article>
            )
        return(articles.map(article =>
            preview(article.title, article.content, article.link, article.category, article.media, article.id, article.completed )
        ))
    }
    function preview(title, content, link, category, image, article_id, completed=false) {
        return (<Card key={article_id} elevation={4} className={classes.article}>
            <CardMedia image={image} component="img" height="160">
            </CardMedia>
            <CardHeader title={completed ? title + '[completed]': title} subheader={category} >
            </CardHeader>
            <CardContent>
                <Typography variant="body1" color="textSecondary">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={"/articles/" + article_id}>
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
        { get_article(article_id) }
        <Fab aria-label="import" color="primary" className={classes.fab} onClick={handleClickOpen}>
            <PostAddIcon />
        </Fab>
    </div >
}