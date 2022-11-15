import { ACC_LOGIN } from "../action/loginAction";
const initialState = {
    account: [],
};

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case ACC_LOGIN:
            return {account: action.account};
        default:
            return state;
    }
};

export default loginReducer;