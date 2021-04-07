import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate, PostShow } from './components/posts';
import { CommentList, CommentCreate, CommentEdit, CommentShow } from './components/comment';
import { UserList, UserCreate, UserEdit, UserShow } from './components/users';
import { dataProvider } from './dataProvider/iDataProvider';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import vietNamMessage from 'ra-language-vietnamese';
import Menu from './menu';
//import { authProvider } from './dataProvider/authProvider';
import authProvider from "./dataProvider/myAuthProvider";
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/People';

const i18nProvider = polyglotI18nProvider(() => vietNamMessage, 'fr');
const App = () => (
  <Admin
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    authProvider={authProvider}
  >
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      show={PostShow}
      icon={PostIcon}>
    </Resource>
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
      show={UserShow}
      icon={UserIcon}>
    </Resource>
    {/* <Resource
      name="comments"
      list={CommentList}
      create={CommentCreate}
      edit={CommentEdit}
      show={CommentShow}>
    </Resource> */}
  </Admin>
)
export default App;