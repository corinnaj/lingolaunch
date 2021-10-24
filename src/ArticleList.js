import React, {useEffect} from "react";
import { Typography, Card, CardContent, CardActions, Button, CardHeader, CardMedia, Fab } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link, useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { capitainBluebearImage } from "./articles/CapitainBluebear";
import { tippingImage } from "./articles/Tipping";
import { applePieImage } from "./articles/ApplePie";
import { Article } from "./articles/Article";
import { kangarooImage } from "./articles/Kangaroo";
import { germanImage } from "./articles/Characteristics";
// import { spaetzleImage } from "./articles/ASortOfPasta";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';


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
            'completed': false,
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
            'content': 'It is true that many Germans tend to place punctuality as a high priority. Hence the global observation that German trains often run perfectly on time. apple',
            'link': 'characteristics',
            'category': 'Cultural Tips',
            'media': germanImage
        },
        {
            'id': 2,
            'completed': false,
            'title': 'Capitain Bluebear',
            'content': 'The 13​¹⁄₂ Lives of Captain Bluebear is a 1999 fantasy novel by German writer and cartoonist Walter Moers which details the numerous lives of a human-sized bear with blue fur.apple',
            'link': 'bluebear',
            'category': 'Media',
            'media': capitainBluebearImage
        },
        {
            'id': 3,
            'completed': false,
            'title': 'The Kangaroo Chronicles',
            'content': '"Marc-Uwe Kling writes funny songs and stories. His business model is to write ooks that fiercely criticize capitalism and sell incredibly well. For his Kangaroo stories he was awarded the German Radio Award, the German Cabaret Award and the German Audio Book Prize. apple',
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

function fetch_user_level(user_id){
    return 2
}

export function ArticleList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState('');
    const [notification, setNotification] = React.useState('');
    const [articles, setArticles] = React.useState(fetch_articles());
    const [level, setLevel] = React.useState(fetch_user_level());
    const { article_id } = useParams();
    const history = useHistory();
    const vertical = 'bottom', horizontal = 'center';

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
        // TODO: check from state if all articles are completed -> level up!
        // use: articles.filter((article) => !article.completed).length
        // check if it is zero
    });

    const markAsComplete = (article_id) => {
        let updated_articles = articles.map(
            (article) => {
                return((article.id == article_id && !article.completed) ? {...article, 'completed': true}: article
                )
            }
        )
        setArticles(updated_articles)
        // TODO: send new state to backend, we reset this on page refresh atm
        history.push("/articles")
        setNotification("CONGRATS! Article \"" + articles[article_id].title + "\" is completed!")

    }

    function get_article(article_id){
        let article = articles.find(article => article.id == article_id)
        if(article)
            return(
                <Article title={article.title} image={article.media} onComplete={() => markAsComplete(article_id)}>
                    {article.content}
                </Article>
            )
        return(articles.map(article =>
            preview(article.title, article.content, article.link, article.category, article.media, article.id, article.completed )
        ))
    }

    function preview(title, content, link, category, image, article_id, completed=false) {
        return (
            <Card key={article_id} elevation={4} className={classes.article}>
                <div className="completed-anchor">
                    <CardMedia image={image} className={completed? 'completed-article': null} component="img" height="160">
                    </CardMedia>
                    {completed? <span className='completed-banner'>COMPLETED</span>:null}
                </div>
                <CardHeader title={title} subheader={category} >
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

    function LinearProgressWithLabel(props) {
        return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress variant="determinate" {...props} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2">{`${Math.round(
                            props.value,
                        )}%`}</Typography>
                    </Box>
                </Box>
        );
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

        <Typography gutterBottom variant="h4" align='center'>
            RandomUser, you are currently at level {level}
        </Typography>
        <Typography gutterBottom variant="body1" align='center' color="textSecondary">
            in this level you will learn german words for: <br/>
            you miss {articles.filter((article) => !article.completed).length} articles to reach level {level + 1}!
        </Typography>
        <LinearProgressWithLabel
            value={100 * (articles.filter((article) => article.completed).length / articles.length)}
        />
        { get_article(article_id) }
        <Snackbar
            autoHideDuration={3000}
            anchorOrigin={{ vertical, horizontal }}
            open={Boolean(notification)}
            onClose={notificationReset}
            message={notification}
            key={notification}
        />
        <Fab aria-label="import" color="primary" className={classes.fab} onClick={handleClickOpen}>
            <PostAddIcon />
        </Fab>
    </div >
}