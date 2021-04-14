import * as React from 'react';
import { AppBar, useSetLocale } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
    space: {
        paddingLeft: 5,
        paddingRight: 5,
    }
});

const MyAppBar = props => {
    const classes = useStyles();
    const [localApp, setLocalApp] = React.useState('vietnamese');
    const setLocale = useSetLocale();

    const handleChange = (event) => {
        setLocalApp(event.target.value);
        setLocale(event.target.value)
    };
    return (
        <AppBar style={{ backgroundColor: 'Success' }} {...props}>
            <Typography
                variant="h6"
                color="initial"
                className={classes.title}
                id="react-admin-title"
            />
            <span className={classes.spacer} />
            <span>
                {localStorage.getItem('username').split(`"`)}
            </span>
            <Select
                value={localApp}
                onChange={handleChange}
                style={{ marginLeft: 30, paddingRight: 20 }}
            >
                <MenuItem
                    selected={true}
                    value={'vi'}>vietnamese</MenuItem>
                <MenuItem value={'en'}>english</MenuItem>
            </Select>
        </AppBar>
    );
};

export default MyAppBar;