function globalReducer(state, action) {
    switch (action.type) {
        case 'setToken': {
            localStorage.setItem("token", action.data || "")
            return {
                ...state,
                token: action.data
            }
        }
        default:
            return state
    }
}

export default globalReducer

