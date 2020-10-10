import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Checkbox,
    List,
    ListItem,
    ListItemIcon,
    IconButton,
    ListItemText,
    ListItemSecondaryAction,
} from "@material-ui/core";
import { Dictionary, translate } from "./Dictionary.js";
import Confetti from "react-dom-confetti";
import { T } from "./PartialTranslationParagraph";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
    },
    list: {
        maxWidth: 360,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    input: {
        maxWidth: 360,
        width: "90%",
    },
}));

const confettiConfig = {
    angle: "78",
    spread: "164",
    startVelocity: "23",
    elementCount: "55",
    dragFriction: 0.12,
    duration: 1500,
    stagger: "0",
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

export default function ShoppingList() {
    const classes = useStyles();
    const [checked, setChecked] = useState([0]);
    const [items, setItems] = useState([])
    const [translatedItems, setTranslatedItems] = useState([])
    const [newItem, setNewItem] = useState('');
    const { usedWord, hasWord, addWord } = useContext(Dictionary);
    const [success, setSuccess] = useState(false);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    async function submit() {
        let translation
        if (usedWord(newItem)) {
            setSuccess(true);
            setTimeout(() => setSuccess(false));
            translation = newItem
        } else {
            translation = await translate(newItem, "de");
        }
        setItems([...items, newItem]);
        setTranslatedItems([...translatedItems, translation]);
        setNewItem("");
    }

    function addWordToDictionary(item, translation) {
        addWord(translation, item);
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            submit();
        }
    }

    function showWord(word, labelId, index) {
        if (hasWord(word)) return (<T w={word} readonly />);
        else return (
            <ListItemText id={labelId} primary={word} secondary={translatedItems[index]} />);
    }

    function showButton(item, translatedItem) {
        if (translatedItem && !hasWord(translatedItem)) {
            return <ListItemSecondaryAction onClick={() => addWordToDictionary(item, translatedItem)}>
                <IconButton>
                    <PlaylistAddIcon />
                </IconButton>
            </ListItemSecondaryAction>
        }
        else {
            return <ListItemSecondaryAction disabled>
                <IconButton>
                    <PlaylistAddCheckIcon />
                </IconButton>
            </ListItemSecondaryAction>
        }
    }

    return (
        <div className={classes.container}>
            <List className={classes.list}>
                {items.map((value, index) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            {showWord(value, labelId, index)}
                            {showButton(value, translatedItems[index])}
                        </ListItem>
                    );
                })}
            </List>
            <Confetti
                style={{ position: "absolute" }}
                active={success}
                config={confettiConfig}
            />
            <TextField
                label="Your item ... (try to type it in German!)"
                className={classes.input}
                value={newItem}
                onChange={(event) => setNewItem(event.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus={true}
            />
        </div>
    );
}
