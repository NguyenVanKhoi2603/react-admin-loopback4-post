import * as React from 'react';
import { Layout } from 'react-admin';
import MyMenu from './MyMenu';
import MyAppBar from './MyAppBar';
import MyNotification from './MyNotification';
import MyError from './MyError';

const MyLayout = (props) =>
    <Layout {...props}
        appBar={MyAppBar}
        menu={MyMenu}
        notification={MyNotification}
        error={MyError}
    />;

export default MyLayout;