import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    TextInput,
    DateField,
    Pagination,
    Filter,
    Edit, SimpleForm,
    EditButton,
    Create,
    DateTimeInput,
    ReferenceField,
    ChipField,
    ReferenceInput,
    SelectInput
} from 'react-admin';
const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput multiline label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="username" />
        </ReferenceInput>
    </Filter>
);
const PostPagination = props => <Pagination rowsPerPageOptions={[2, 5, 7, 10]} {...props} />;
export const PostList = props => (
    <List pagination={<PostPagination />} filters={<PostFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="content" />
            <ReferenceField source="userId" reference="users" >
                <ChipField source="username"></ChipField>
            </ReferenceField>
            <DateField source="timestamp" showTime></DateField>
            <EditButton></EditButton>
        </Datagrid>
    </List>
);

export const PostEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextInput source="title" />
            <TextInput source="content" />
            <ReferenceField source="userId" reference="users" >
                <TextField source="username"></TextField>
            </ReferenceField>
            <DateTimeInput source="timestamp" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput resettable source="title" />
            <TextInput resettable source="content" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="username" />
            </ReferenceInput>
            <DateTimeInput source="timestamp" />
        </SimpleForm>
    </Create>
);