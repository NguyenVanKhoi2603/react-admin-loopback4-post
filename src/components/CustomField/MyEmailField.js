import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
    },
    icon: {
        width: '0.5em',
        paddingLeft: 2,
    },
});

const MyEmailField = ({ record = {}, source }) => {
    const classes = useStyles();
    return (
        <a href={`mailto:` + record[source]} className={classes.link}>
            {record[source]}
            <MailOutlineIcon className={classes.icon} />
        </a>
    );
}

export default MyEmailField;