import * as React from 'react';
import {
    ChipField,
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
    Show,
    useNotify, useRefresh, useRedirect,
    // CardActions,
    // CreateButton,
    SaveButton,
    Toolbar,
    translate
} from 'react-admin';
// import { Route } from 'react-router';
// import { connect } from "react-redux";
// import { push } from "react-router-redux";
//import { Drawer, } from '@material-ui/core';
import CustomizableDatagrid from 'ra-customizable-datagrid';
import Button from '@material-ui/core/Button';
import PostReferenceInput from './PostReferenceInput';

const TagCreateToolbar = translate(({ onCancel, translate, ...props }) => (
    <Toolbar {...props}>
        <SaveButton />
        <Button onClick={onCancel}>{translate('ra.action.cancel')}</Button>
    </Toolbar>
));
const CommentFilter = (props) => (
    <Filter {...props}>
        <TextInput multiline label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="username" />
        </ReferenceInput>
    </Filter>
);
const optionsTime = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
}

// const TagListActions = ({ basePath }) => (
//     <CardActions>
//         <CreateButton basePath={basePath} />
//     </CardActions>
// );

// export default connect(undefined, { push })(CommentList);

// export class CommentList extends React.Component {
//     render() {
//         const props = this.props;
//         return (
//             <React.Fragment>
//                 <List filters={<CommentFilter />} {...props} actions={<TagListActions />}>
//                     <CustomizableDatagrid rowClick="show">
//                         <TextField source="id" />
//                         <TextField source="content" />
//                         <TextField source="postId" />
//                         <ReferenceField source="userId" reference="users" >
//                             <ChipField source="username" />
//                         </ReferenceField>
//                         <DateField source="timestamp" locales="vi" options={optionsTime} />
//                         <EditButton></EditButton>
//                     </CustomizableDatagrid>
//                 </List>
//                 <Route
//                     patch="comments/create"
//                 >
//                     {({ match }) => (
//                         <Drawer open={!!match} anchor="right" onClose={this.handleClose}>
//                             <CommentCreate onCancel={this.handleClose} {...props} />
//                         </Drawer>
//                     )}
//                 </Route>
//             </React.Fragment>
//         );
//     }
//     handleClose = () => {
//         this.props.push("/comments");
//     };
// }
export const CommentList = props => (
    <List filters={<CommentFilter />} {...props}>
        <CustomizableDatagrid rowClick="show">
            <TextField source="id" />
            <TextField source="content" />
            <TextField source="postId" />
            <ReferenceField source="userId" reference="users" >
                <ChipField source="username" />
            </ReferenceField>
            <DateField source="timestamp" locales="vi" options={optionsTime} />
            <EditButton></EditButton>
        </CustomizableDatagrid>
    </List>
);
export const CommentCreate = ({ onCancel, ...props }) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Create success!')
        redirect('/comments');
        refresh();
    };
    const onFailure = () => {
        notify('Create Failure!')
        redirect('/comments');
        refresh();
    };
    return (
        <Create {...props} onFailure={onFailure} onSuccess={onSuccess}>
            <SimpleForm toolbar={<TagCreateToolbar onCancel={onCancel} />}>
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
    )
}

export const CommentEdit = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const onSuccess = () => {
        notify('Create success!')
        redirect('/comments');
        refresh();
    };
    const onFailure = () => {
        notify('Create Failure!')
        redirect('/comments');
        refresh();
    };
    return (
        <Edit {...props} onFailure={onFailure} onSuccess={onSuccess}>
            <SimpleForm>
                <TextField source="id" />
                <ReferenceField source="userId" reference="users" >
                    <TextField source="username"></TextField>
                </ReferenceField>
                <ReferenceField label="Title of post" source="postId" reference="posts" >
                    <TextField source="title"></TextField>
                </ReferenceField>
                <PostReferenceInput
                    source="postId"
                    reference="posts"
                    allowEmpty
                    perPage={10000}
                />
                <TextInput source="content" />
                <DateTimeInput source="timestamp" />

            </SimpleForm>
        </Edit>
    )
}

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