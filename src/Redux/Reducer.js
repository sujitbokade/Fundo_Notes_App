const initialState = {
    layout: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LAYOUT":
            return {
                layout: !state.layout
            }
        default: return state
    }
}