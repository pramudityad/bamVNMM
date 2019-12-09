import ActionType from './globalActionType';

const globalState = {
    loginData : {
        "role" : ["Public"],
        "userName" : null,
        "email" : null,
        "_id" : null,
    }
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
            }
        }
    }
    return state;
}

export default rootReducer;
