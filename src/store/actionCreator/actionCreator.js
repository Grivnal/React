import * as authActions from "../reducers/authReducer/actions";
import * as userActions from "../reducers/userReducer/actions";
import * as themeActions from "../reducers/themeReducer/actions";
import * as roleActions from "../reducers/roleReducer/actions";

const actionCreator = {
    ...authActions,
    ...userActions,
    ...themeActions,
    ...roleActions
};

export default actionCreator;