import { User } from "src/app/shared/model/user"
import * as AuthActions from "./auth.actions"

export interface State {
    user: User
}
const intialState: State = {
    user: null
}

export function authReducer(state = intialState, action: AuthActions.AuthActions) {

    switch (action.type) {
        case AuthActions.LOGIN:
            const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate)
            return {
                ...state, 
                user: user
            }
            break;
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
            break;
        default:
            return state
    }
}