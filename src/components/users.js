import * as React from "react";
import {
    List,
    TextField,
    TextInput,
    SelectInput,
    Create,
    SimpleForm,
    Edit,
    Show,
    SimpleShowLayout,
    required,
    minLength,
    maxLength,
    Filter,
    useListContext,
    usePermissions,
    ChipField,
    useNotify, useRefresh, useRedirect,
} from 'react-admin';
import MyEmailField from './CustomField/MyEmailField';
import { MyEditButton, MyShowButton } from './CustomField/MyButton';
import PersonIcon from '@material-ui/icons/Person';

import { Card, CardActions, CardHeader, Avatar, CardContent, Typography } from '@material-ui/core';
const categoryGender = [
    { id: true, name: 'Men' },
    { id: false, name: 'Women' },
]

const categoryRole = [
    { id: 'ADMIN', name: 'ADMIN' },
    { id: 'USER', name: 'USER' },
    { id: 'MANAGER', name: 'MANAGER' },
]

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput multiline label="search User" source="q" alwayOn />
    </Filter>
)
const cardStyle = {
    width: 320,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

const UserGrid = () => {
    const { ids, data, basePath } = useListContext();
    const { permissions } = usePermissions();
    return (
        permissions !== `"MANAGER"` ? (<div>
            Forbidden
        </div>) :
            (<div style={{ margin: '1em' }}>
                {ids.map(id =>
                    <Card key={id} style={cardStyle}>
                        <CardHeader
                            title={<TextField record={data[id]} source="username" />}
                            subheader={<MyEmailField record={data[id]} source="email" />}
                            avatar={<Avatar icon={<PersonIcon />} />}
                        />
                        <CardContent>
                            <ChipField record={data[id]} source="role" />
                        </CardContent>
                        <CardActions>
                            <CardActions style={{ textAlign: 'right' }}>
                                <MyEditButton resource="users" basePath={basePath} record={data[id]} />
                            </CardActions>
                            <CardActions style={{ textAlign: 'left' }}>
                                <MyShowButton resource="users" basePath={basePath} record={data[id]} />
                            </CardActions>
                        </CardActions>
                    </Card>
                )}
            </div>)
    );
};

export const UserList = props => (
    <List {...props} filters={<UserFilter />}>
        {/* <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="username" />
            <EmailField source="email" />
            <BooleanField source="gender"></BooleanField>
            <ChipField source="role" />
            <EditButton></EditButton>
        </Datagrid> */}
        <UserGrid />
    </List>
);
export const UserShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="email" />
            <TextField source="role" />
        </SimpleShowLayout>
    </Show>
);

const validateUsername = [required(), minLength(6), maxLength(25)];
const validatePassword = [required(), minLength(6), maxLength(35)];

export const UserCreate = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Create success!')
        redirect('/users');
        refresh();
    };
    const onFailure = () => {
        notify('Create Failure!')
        redirect('/users');
        refresh();
    };
    return (
        <Create onSuccess={onSuccess} onFailure={onFailure} {...props}>
            <SimpleForm submitOnEnter={true}>
                <SelectInput source="Gender" choices={categoryGender}>
                </SelectInput>
                <TextInput resettable source="username" validate={validateUsername} />
                <TextInput resettable source="email" />
                <TextInput resettable type="password" source="password" validate={validatePassword} />
            </SimpleForm>
        </Create>
    );
}

const Aside = () => (
    <div style={{ width: 200, margin: '1em' }}>
        <Typography variant="h6">Post details</Typography>
        <Typography variant="body2">
            Posts will only be published once an editor approves them
        </Typography>
    </div>
);

export const UserEdit = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Update success!')
        redirect('/users');
        refresh();
    };
    const onFailure = () => {
        notify('Update Failure!')
        redirect('/users');
        refresh();
    };
    return (
        <Edit {...props} onSuccess={onSuccess} onFailure={onFailure} aside={<Aside />}>
            <SimpleForm>
                <TextField source="id" />
                <TextInput resettable source="username" />
                <TextInput resettable source="email" />
                <SelectInput source="gender" choices={categoryGender}>
                </SelectInput>
                <SelectInput source="role" choices={categoryRole}>
                </SelectInput>
            </SimpleForm>
        </Edit>
    )
}