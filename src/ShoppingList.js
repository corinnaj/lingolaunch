import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import "./ShoppingList.css";
import { Translate } from '@material-ui/icons';
import { TextField, Checkbox, List, ListItem, ListItemIcon, IconButton, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

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
            width: '100%',
        },
    }),
);

export default function ShoppingList() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    const [items, setItems] = React.useState([])
    const [newItem, setNewItem] = React.useState('');

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
            <TextField className={classes.input} value={newItem} onChange={(event) => setNewItem(event.target.value)} onKeyPress={handleKeyPress} autoFocus={true} />
        </div>
    );
}