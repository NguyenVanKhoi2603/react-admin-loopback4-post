import * as React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { DashboardMenuItem, MenuItemLink, getResources } from 'react-admin';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { PersonOutline, CommentOutlined } from '@material-ui/icons';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LabelImportantOutlinedIcon from '@material-ui/icons/LabelImportantOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const Menu = ({ onMenuClick, logout }) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);

    const classes = useStyles();
    const [openMenu, setOpenMenu] = React.useState(false);

    const handleClick = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <div>
            <DashboardMenuItem style={{ padding: 15, color: 'black' }} onClick={onMenuClick} sidebarIsOpen={open} />
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                // subheader={
                //     <ListSubheader component="div" id="nested-list-subheader">
                //         Dashboard Menu
                //      </ListSubheader>
                // }
                className={classes.root}
            >
                <ListItem button component={Link} to="/users" >
                    <ListItemIcon>
                        <PersonOutline />
                    </ListItemIcon>
                    <ListItemText primary="User" />
                </ListItem>

                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <LabelImportantOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Content" />
                    {openMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} component={Link} to="/posts">
                            <ListItemIcon>
                                <FeaturedPlayListOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Posts" />
                        </ListItem>
                        <ListItem button className={classes.nested} component={Link} to="/comments">
                            <ListItemIcon>
                                <CommentOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Comments" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            {/* <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            {resources.map(resource => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={
                        (resource.options && resource.options.label) ||
                        resource.name
                    }
                    leftIcon={
                        resource.icon ? <resource.icon /> : <DefaultIcon />
                    }
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}
            <MenuItemLink
                to="/custom-route"
                primaryText="Miscellaneous"
                leftIcon={<LabelIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            /> */}
            {isXSmall && logout}
        </div>
    );
};

export default Menu;