import React from "react";
import { Typography, Card, CardContent, CardActions, Button, CardHeader } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    article: {
        margin: "16px",
    },
}));

export function ArticleList() {
    const classes = useStyles();

    function preview(title, content, link, category) {
        return (<Card elevation={4} className={classes.article}>
            <CardHeader title={title} subheader={category}>
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
        {preview("Tipping Culture", "Turns out, the Deutsche do not like to zahl proper Geld to their staff in Restaurants. Thus, you have to do it.", "tipping", "Cultural Tips")}
        {preview("Apple Pie", "Apple pie on Sunday at grandmas place is a childhood memory many germans share. Here is a recipe for your own apple pie.", "applepie", "Recipes")}
    </div>
}