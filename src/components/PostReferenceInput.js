import React from 'react';
import { useFormState } from 'react-final-form';
// import { ReferenceInput, SelectInput, TextField } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import PostQuickPreviewButton from './PostQuickPreviewButton';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    }
});

const spySubscription = { values: true };

const PostReferenceInput = props => {
    const classes = useStyles();
    //const [version, setVersion] = useState(0);
    const { values } = useFormState({ subscription: spySubscription });
    //const handleChange = useCallback(() => setVersion(version + 1), [version]);

    return (
        <div className={classes.root}>
            {/* <ReferenceInput key={version} {...props}>
                <TextField optionText="title" />
            </ReferenceInput>
            <TextField source="title" /> */}
            <PostQuickPreviewButton id={values.postId} />
            {/* <PostQuickCreateButton onChange={handleChange} />
            {!!values.post_id && <PostQuickPreviewButton id={values.post_id} />} */}
        </div>
    );
};

export default PostReferenceInput;
