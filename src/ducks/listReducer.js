const initialState = {
    posts: []
}

// ACTION CONSTS
const NEXT_TEN = 'NEXT_TEN'

export const nextTen = (nextPage) => {
    return {
        type: NEXT_TEN,
        payload: nextPage
    }
}

const listReducer = (state = initialState, action) => {
    const {payload, type} = action
    switch (type) {
        case NEXT_TEN:
            console.log(payload)
            return {
                posts: {payload}
            }
        default:
            return state;
    }
}

export default listReducer