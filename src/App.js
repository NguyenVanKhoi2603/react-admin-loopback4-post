import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate, PostShow } from './components/posts';
import { CommentList, CommentCreate, CommentEdit, CommentShow } from './components/comment';
import { UserList, UserCreate, UserEdit, UserShow } from './components/users';
import { dataProvider } from './dataProvider/iDataProvider';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import vietNamMessage from 'ra-language-vietnamese';
import englishMessages from "ra-language-english";
import authProvider from "./dataProvider/myAuthProvider";
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/People';
import MyLayout from "./components/MyLayout";
import Dashboard from "./components/Dashboard";
import { createBrowserHistory } from "history";

//const i18nProvider = polyglotI18nProvider(() => vietNamMessage, 'fr');

const i18nProvider = polyglotI18nProvider(locale =>
  locale === 'vi' ? vietNamMessage : englishMessages,
  'vi' // Default locale
)
const history = createBrowserHistory();
const App = () => (
  <Admin
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    layout={MyLayout}
    history={history}
  >

    {permissions => [
      <Resource
        name="comments"
        list={CommentList}
        edit={permissions === `"ADMIN"` || permissions === `"MANAGER"` ? CommentEdit : null}
        create={permissions === `"ADMIN"` || permissions === `"MANAGER"` ? CommentCreate : null}
        show={CommentShow}
      />,
      <Resource
        name="posts"
        list={PostList}
        edit={permissions === `"ADMIN"` || permissions === `"MANAGER"` ? PostEdit : null}
        create={permissions === `"ADMIN"` || permissions === `"MANAGER"` ? PostCreate : null}
        show={PostShow}
        icon={PostIcon}
      />,
      <Resource
        name="users"
        list={UserList}
        edit={permissions === `"ADMIN"` || permissions === `"MANAGER"` ? UserEdit : null}
        icon={UserIcon}
        create={UserCreate}
        show={UserShow} />
    ]}
  </Admin>
)
export default App;