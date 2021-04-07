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
    SimpleShowLayout,
    required,
    minLength,
    maxLength,
    Filter,
    EmailField,
    BooleanField,
    BooleanInput,
    ChipField
} from 'react-admin';

const categoryGender = [
    { id: true, name: 'Men' },
    { id: false, name: 'Women' },
]

const categoryRole = [
    { id: 'ADMIN', name: 'ADMIN' },
    { id: 'USER', name: 'USER' },
]

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput multiline label="search User" source="q" alwayOn />
    </Filter>
)

export const UserList = props => (
    <List {...props} filters={<UserFilter />}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="username" />
            <EmailField source="email" />
            <BooleanField source="gender"></BooleanField>
            <ChipField source="role" />
            <EditButton></EditButton>
        </Datagrid>
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

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm submitOnEnter={true}>
            <SelectInput source="Gender" choices={categoryGender}>
            </SelectInput>
            <TextInput resettable source="username" validate={validateUsername} />
            <TextInput resettable source="email" />
            <TextInput resettable type="password" source="password" validate={validatePassword} />
        </SimpleForm>
    </Create>
);

export const UserEdit = props => (
    <Edit {...props}>
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
);
