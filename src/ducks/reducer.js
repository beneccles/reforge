const initialState = {
    username: "",
    id: null,
    profile: "",
    loggedIn: false
}

// ACTION CONSTS
const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

// ACTION BUILDERS
export const updateUser = (userObj) => {
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

// Reducer Function
const reducer = (state = initialState, action) => {
    const {payload, type} = action
    switch (type) {
        case LOGOUT:
            // Clear state
            return initialState;
        case UPDATE_USER:
            return {...state, ...payload}
        default:
            return state;
    }
}

export default reducer