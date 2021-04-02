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
    SelectInput,
    Show,
    SimpleShowLayout,
    ShowButton
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
const PostPanel = ({ id, record, resource }) => (
    <div dangerouslySetInnerHTML={{ __html: record.content }} />
);

export const PostShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users" >
                <TextField source="username"></TextField>
            </ReferenceField>
            <TextField source="title" />
            <TextField source="content" />
            <DateField options={optionsTime} source="timestamp" locales="vi" />
        </SimpleShowLayout>
    </Show>
);

const optionsTime = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
}
export const PostList = props => (
    <List pagination={<PostPagination />} filters={<PostFilter />} {...props}>
        <Datagrid rowClick="edit" expand={<PostPanel />}>
            <TextField source="id" />
            <TextField source="title" />
            <ReferenceField source="userId" reference="users" >
                <ChipField source="username"></ChipField>
            </ReferenceField>
            <DateField source="timestamp" options={optionsTime} locales="vi"></DateField>
            <EditButton></EditButton>
            <ShowButton></ShowButton>
        </Datagrid>
    </List>
);

export const PostEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextInput source="title" />
            <TextInput source="content" multiline />
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