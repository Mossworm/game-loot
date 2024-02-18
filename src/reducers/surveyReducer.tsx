export const initialState = { currentQuestion: 0 };

export function questionReducer(state: any, action: any) {
    switch (action.type) {
        case 'next':
            return {...state, currentQuestion: state.currentQuestion + 1};
        default:
            throw new Error("unnamed action type:",action.type)
    }
}