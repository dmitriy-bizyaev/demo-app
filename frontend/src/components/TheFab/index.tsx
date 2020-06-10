import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'

export interface Props {
    onClick: () => void,
}

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        zIndex: 1,
        right: '20px',
        bottom: '20px',
    },
});

export default function TheFab(props: Props) {
    const classes = useStyles();

    return (
        <Fab color="primary" className={classes.root} onClick={props.onClick}>
            <AddIcon />
        </Fab>
    );
}
