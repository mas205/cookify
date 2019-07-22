import { SIGN_IN, SIGN_OUT } from './types'

export const signIn = (userId, userName) => {
    return {
        type: SIGN_IN,
        payload: {
            userId,
            userName
        }
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const addDish = (dish) => {
    return {
        type: "ADD_DISH",
        payload: dish
    };
};

export const editDish = (dish) => {
    return {
        type: "EDIT_DISH",
        payload: dish
    };
};

export const deleteDish = (dish) => {
    return {
        type: "DELETE_DISH",
        payload: dish
    };
};