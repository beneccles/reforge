import axios from 'axios';

const initialState = {
    posts: [],
    loading: false
}

// ACTION CONSTS
const NEXT_TEN = 'NEXT_TEN'
const POST_RETURN = 'POST_RETURN'

export const nextTen =  (nextPage) => {
    const data = axios.get(`/api/posts?offset=${nextPage}`).then(res => res.data)
    return {
        type: NEXT_TEN,
        payload: data
    }
}

export const postReturn = () => {
    return {
        type: POST_RETURN
    }
}

const listReducer = (state = initialState, action) => {
    const {payload, type} = action
    console.log(type, payload)
    console.log(state)
    switch (type) {
        case NEXT_TEN + '_FULFILLED':
            return {
                ...state, ...payload, loading: false
            }
        case NEXT_TEN +'_PENDING':
            return {...state, loading: true}
        case POST_RETURN:
            return {...state}
        default:
            return state;
    }
}

export default listReducer