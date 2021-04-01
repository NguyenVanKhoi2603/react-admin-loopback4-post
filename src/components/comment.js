import * as React from 'react';
import {
    ChipField,
    Datagrid,
    List,
    TextField,
    EditButton,
    DateField,
    ReferenceField,
    Create,
    SimpleForm,
    TextInput,
    DateTimeInput,
    ReferenceInput,
    SelectInput,
    Edit,
    Filter,
    SimpleShowLayout,
    Show
} from 'react-admin';
const CommentFilter = (props) => (
    <Filter {...props}>
        <TextInput multiline label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="username" />
        </ReferenceInput>
    </Filter>
);
export const CommentList = props => (
    <List filters={<CommentFilter />} {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="content" />
            <TextField source="postId" />
            <ReferenceField source="userId" reference="users" >
                <ChipField source="username"></ChipField>
            </ReferenceField>
            <DateField source="timestamp" showTime></DateField>
            <EditButton></EditButton>
        </Datagrid>
    </List>
);
export const CommentCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="content" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="username" />
            </ReferenceInput>
            <ReferenceInput source="postId" reference="posts">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <DateTimeInput source="timestamp" />
        </SimpleForm>
    </Create>
);

export const CommentEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users" >
                <TextField source="username"></TextField>
            </ReferenceField>
            <ReferenceField label="Title of post" source="postId" reference="posts" >
                <TextField source="title"></TextField>
            </ReferenceField>
            <TextInput source="content" />
            <DateTimeInput source="timestamp" />
        </SimpleForm>
    </Edit>
);

export const CommentShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users" >
                <TextField source="username"></TextField>
            </ReferenceField>
            <ReferenceField label="Title of post" source="postId" reference="posts" >
                <TextField source="title"></TextField>
            </ReferenceField>
            <TextField source="content" />
            <TextField source="timestamp" />
        </SimpleShowLayout>
    </Show>
);