import * as React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
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
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <AppBar style={{ backgroundColor: 'Success' }} {...props}>
            <Typography
                variant="h6"
                color="white"
                className={classes.title}
                id="react-admin-title"
            />
            <span className={classes.spacer} />
            <span>
                {localStorage.getItem('username').split(`"`)}
            </span>

            <FormControl className={classes.formControl, classes.space}>
                <Select
                    labelId=""
                    id=""
                    value={age}
                    onChange={handleChange}
                    style={{ marginLeft: 30, paddingRight: 20 }}
                >
                    <MenuItem selected value={10}>vietnamese</MenuItem>
                    <MenuItem value={20}>english</MenuItem>
                    <MenuItem value={30}>korean</MenuItem>
                </Select>
            </FormControl>

        </AppBar>
    );
};

export default MyAppBar;