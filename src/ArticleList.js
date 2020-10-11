import React from "react";
import { Typography, Card, CardContent, CardActions, Button, CardHeader, CardMedia } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { capitainBluebearImage } from "./articles/CapitainBluebear";
import { tippingImage } from "./articles/Tipping";
import { applePieImage } from "./articles/ApplePie";
import { kangarooImage } from "./articles/Kangaroo";
import { germanImage } from "./articles/Characteristics";
import { spaetzleImage } from "./articles/ASortOfPasta";

const useStyles = makeStyles((theme) => ({
    article: {
        margin: "16px",
    },
}));

export function ArticleList() {
    const classes = useStyles();

    function preview(title, content, link, category, image) {
        return (<Card elevation={4} className={classes.article}>
            <CardMedia image={image} component="img" height="160">
            </CardMedia>
            <CardHeader title={title} subheader={category} >
            </CardHeader>
            <CardContent>
                <Typography variant="body1" color="textSecondary">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={"/articles/" + link}>
                    <Button size="small" color="primary">
                        Read More
                </Button>
                </Link>
            </CardActions>
        </Card >);
    }

    return <div>
        {preview("Tipping Tips", "Tipping in Germany and tipping in some other countries, such as the United States, are totally different. In Germany, waitresses are paid more and so the tips are smaller compared to the USA. Nevertheless, the 5-10% rule of thumb still applies.", "tipping", "Cultural Tips", tippingImage)}
        {preview("Apple Pie", "German Apple Cake is a traditional German dessert that is so easy to make even if you aren’t totally kitchen confident! With a simple batter that rises up and bakes around the apples this easy apple coffee cake is the perfect everyday dessert that tastes best with a dollop of whipped cream on top.", "applepie", "Recipes", applePieImage)}
        {preview("Capitain Bluebear", "The 13​¹⁄₂ Lives of Captain Bluebear is a 1999 fantasy novel by German writer and cartoonist Walter Moers which details the numerous lives of a human-sized bear with blue fur. It's a modern german classic.", "bluebear", "Media", capitainBluebearImage)}
        {preview("The Kangaroo Chronicles", "Marc-Uwe Kling writes funny songs and stories. His business model is to write books that fiercely criticize capitalism and sell incredibly well. For his Kangaroo stories he was awarded the German Radio Award, the German Cabaret Award and the German Audio Book Prize.", "kangaroo", "Media", kangarooImage)}
        {preview("German Characteristics", "It is true that many Germans tend to place punctuality as a high priority. Hence the global observation that German trains often run perfectly on time.", "characteristics", "Cultural Tips", germanImage)}
        {preview("Käsespätzle", "Spätzle is a type of pasta made with fresh eggs and found in the cuisines of southern Germany and Austria, Switzerland, Hungary, Slovenia, Alsace, Moselle and South Tyrol.", "spaetzle", "Recipes", spaetzleImage)}
    </div>
}