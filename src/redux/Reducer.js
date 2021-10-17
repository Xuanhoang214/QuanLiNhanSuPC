import { ACTION_LOGIN } from './Action'

const defaultStore = {
    infoPerson: {},
}

//Reducer
export const reducer = (state = defaultStore, action) => {
    switch (action.type) {
        case ACTION_LOGIN:
            // console.log(action)
            state.infoPerson = { ...action.value }
            return state
        default:
            return state
    }
}
