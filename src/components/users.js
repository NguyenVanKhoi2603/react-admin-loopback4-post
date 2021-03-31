import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    TextInput,
    SelectInput,
    Create,
    SimpleForm,
    Edit,
    EditButton,
    Show,
    SimpleShowLayout
} from 'react-admin';

const categoryRole = [
    { id: 1, name: 'Customer' },
    { id: 0, name: 'Admin' },
]

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="password" />
            <TextField source="role"></TextField>
            <EditButton></EditButton>
        </Datagrid>
    </List>
);
export const UserShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="password" />
        </SimpleShowLayout>
    </Show>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput resettable source="username" />
            <TextInput resettable type="password" source="password" />
            <SelectInput source="role" choices={categoryRole}>
            </SelectInput>
        </SimpleForm>
    </Create>
);

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextInput resettable source="username" />
            <TextInput resettable type="password" source="password" />
            <SelectInput source="role" choices={[
                { id: 1, name: 'customer' },
                { id: 0, name: 'admin' },
            ]}>
            </SelectInput>
        </SimpleForm>
    </Edit>
);
