import ActionType from './globalActionType';

const globalState = {
    loginData : {
        "role" : ["Public"],
        "nameUser" : null,
        "userName" : null,
        "email" : null,
        "account_id" : null,
        "token" : null,
        "sso_id" : null,
        "_id" : null,
    },
    minimizeSidebar : false,
}

//reducer
const rootReducer = ( state = globalState, action) => {
    if(action.type === ActionType.LOGIN_DATA){
        return {
            ...state,
            loginData: {
                "role" :  action.data_user.roles_user,
                "userName" : action.data_user.user_name,
                "email" : action.data_user.email_user,
                "_id" : action.data_user._id_user,
                "account_id" : action.data_user.account_id,
                "token" : action.data_user.token,
                "sso_id" : action.data_user.sso_id,
                "nameUser" : action.data_user.name,
            }
        }
    }
    if(action.type === ActionType.MINIMIZE_SIDEBAR){
        return {
            ...state,
            minimizeSidebar : action.minimize_sidebar,
        }
    }
    return state;
}

export default rootReducer;
