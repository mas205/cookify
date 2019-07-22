import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'
import dishesReducer from './dishesReducer'

export default combineReducers({
    auth: authReducer,
    dishes: dishesReducer,
    form: formReducer
});