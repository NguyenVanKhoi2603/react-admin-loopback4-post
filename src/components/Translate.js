export const transVn = {
    resources: {
        users: {
            name: 'Người dùng |||| Những người dùng',
            fields: {
                id: 'ID',
                username: 'Tên người dùng',
                email: 'Email',
                role: 'quyền'
            },
        },
        posts: {
            name: 'Bài viết |||| Những bài viết',
            fields: {
                id: 'ID',
                title: 'Tiêu đề',
                userId: 'ID người tạo',
                content: 'Nội dung',
                timestamp: 'Thời gian tạo'
            }
        },
        comments: {
            name: 'Bình luận |||| Những bình luận',
            field: {
                id: 'ID',
                content: 'Nội dung',
                timestamp: 'Thời gian tạo',
                userId: 'ID người tạo',
                postId: 'ID bài viết',
            }
        },
    },
}
export const transEN = {
    resources: {
        users: {
            name: 'User |||| Users',
            fields: {
                id: 'ID',
                username: 'Username',
                email: 'Email',
                role: 'Role'
            },
        },
        posts: {
            name: 'Post |||| Posts',
            fields: {
                id: 'ID',
                title: 'Title',
                content: 'Content',
                userId: 'User Id',
                timestamp: 'Timestamp'
            }
        },
        comments: {
            name: 'Comment |||| Comments',
            field: {
                id: 'ID',
                content: 'Content',
                timestamp: 'Timestamp',
                userId: 'User Id',
                postId: 'Post Id',
            }
        },
    },
}