import React, { useState, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Translate } from '@material-ui/icons';
import { TextField, Checkbox, List, ListItem, ListItemIcon, IconButton, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { Dictionary } from "./Dictionary.js";
import Confetti from "react-dom-confetti";

const useStyles = makeStyles((theme) =>
    ({
        container: {
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            flexDirection: 'column',
        },
        list: {
            maxWidth: 360,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        input: {
            maxWidth: 360,
            width: '90%',
        },
    }),
);

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
    const [newItem, setNewItem] = useState('');
    const { usedWord } = useContext(Dictionary);
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

    function submit() {
        if (usedWord(newItem)) {
            setSuccess(true);
            setTimeout(() => setSuccess(false));
        }
        setItems([...items, newItem]);
        setNewItem('');
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            submit();
        }
    }


    return (
        <div className={classes.container}>
            <List className={classes.list}>
                {items.map((value) => {
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
                            <ListItemText id={labelId} primary={value} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <Translate />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
            <Confetti
                style={{ position: "absolute" }}
                active={success}
                config={confettiConfig}
            />
            <TextField className={classes.input} value={newItem} onChange={(event) => setNewItem(event.target.value)} onKeyPress={handleKeyPress} autoFocus={true} />
        </div>
    );
}