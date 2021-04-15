import * as React from 'react';
import { AppBar, useSetLocale, MenuItemLink, UserMenu } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { PersonOutline } from '@material-ui/icons';

const ConfigurationMenu = React.forwardRef(({ onClick }, ref) => (
    <MenuItemLink
        ref={ref}
        to=""
        disabled={true}
        primaryText={localStorage.getItem('username').split(`"`)}
        leftIcon={<PersonOutline />}
        onClick={onClick}
    />
));

const MyUserMenu = props => (
    <UserMenu {...props}>
        <ConfigurationMenu />
    </UserMenu>
);
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
        <AppBar
            style={{ backgroundColor: 'Success' }} {...props}
            userMenu={<MyUserMenu />}>
            <Typography
                variant="h6"
                color="initial"
                className={classes.title}
                id="react-admin-title"
            />
            <span className={classes.spacer} />
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={localApp}
                    onChange={handleChange}
                >
                    <MenuItem
                        value={'vi'}>vi</MenuItem>
                    <MenuItem value={'en'}>en</MenuItem>
                </Select>
            </FormControl>
        </AppBar>
    );
};

export default MyAppBar;