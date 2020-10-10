import React from "react";
import { Typography, Card, CardContent, CardActions, Button, CardHeader, CardMedia } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { capitainBluebearImage } from "./articles/CapitainBluebear";
import { tippingImage } from "./articles/Tipping";
import { applePieImage } from "./articles/ApplePie";

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
        {preview("Tipping Culture", "Turns out, the Deutsche do not like to zahl proper Geld to their staff in Restaurants. Thus, you have to do it.", "tipping", "Cultural Tips", tippingImage)}
        {preview("Apple Pie", "Apple pie on Sunday at grandmas place is a childhood memory many germans share. Here is a recipe for your own apple pie.", "applepie", "Recipes", applePieImage)}
        {preview("Capitain Bluebear", "The 13​¹⁄₂ Lives of Captain Bluebear is a 1999 fantasy novel by German writer and cartoonist Walter Moers which details the numerous lives of a human-sized bear with blue fur. It's a modern german classic.", "bluebear", "Media", capitainBluebearImage)}
    </div>
}