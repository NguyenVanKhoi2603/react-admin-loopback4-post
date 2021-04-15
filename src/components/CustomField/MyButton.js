import * as React from 'react';
import { EditButton, SaveButton, ShowButton } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyle = makeStyles({
    button: {
        fontWeight: 'bold',
        border: 2,
        borderWidth: 2,
        borderColor: "red",
        color: 'red',
        // This is JSS syntax to target a deeper element using css selector, here the svg icon for this button
        '& svg': { color: 'red' }
    },
    button_show: {
        fontWeight: 'bold',
        color: 'primary',
        // This is JSS syntax to target a deeper element using css selector, here the svg icon for this button
        '& svg': { color: 'primary' }
    },
    border_custom: {
        border: 2,
        borderColor: 'green'
    }
})

export const MyEditButton = (props) => {
    const classes = useStyle();
    return (
        <Box borderRadius="15%" border={0.5} borderColor="primary.main">
            <EditButton className={classes.button} {...props} />
        </Box>
    )
}

export const MySaveButton = (props) => {
    const classes = useStyle();
    return (
        <div>
            <SaveButton className={classes.button} {...props} />
        </div>
    )
}

export const MyShowButton = (props) => {
    const classes = useStyle();
    return (
        <div>
            <ShowButton className={classes.button_show} {...props} />
        </div>
    )
}