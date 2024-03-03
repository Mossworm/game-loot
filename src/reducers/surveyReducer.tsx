export const SURVEY_ACTIONS = {
    NEXT: 'next',
    PREV: 'prev',
    SELECT: 'select',
} as const;

interface IState {
    currentQuestion: number;
    leading: number;
    selected: number[];
    loading: boolean;
}

type TActionType = (typeof SURVEY_ACTIONS)[keyof typeof SURVEY_ACTIONS];
interface IAction {
    type: TActionType;
    answer?: number;
}

export const initialState = {
    currentQuestion: 0,
    leading: 0,
    selected: [],
    loading: false,
};

const SURVEY_QUESTIONS_COUNT = 30;

export function surveyReducer(state: IState, action: IAction) {
    switch (action.type) {
        case SURVEY_ACTIONS.NEXT://이동만 함
            if (
                    state.currentQuestion === state.leading ||
                    state.currentQuestion >= SURVEY_QUESTIONS_COUNT - 1
            ) return state;
            return {...state, currentQuestion: state.currentQuestion + 1};

        case SURVEY_ACTIONS.PREV:
            if (state.currentQuestion === 0) return state;
            return {...state, currentQuestion: state.currentQuestion - 1};

        case SURVEY_ACTIONS.SELECT://선택하고 이동도 함
            if (typeof(action.answer) != "number") return state;

            const newState = {...state};
            newState.selected[state.currentQuestion] = action.answer;

            if (
                state.currentQuestion === state.leading &&
                state.currentQuestion < SURVEY_QUESTIONS_COUNT - 1
                ) {
                newState.currentQuestion++;
            }
            if (
                state.currentQuestion === state.leading &&
                state.currentQuestion <= SURVEY_QUESTIONS_COUNT - 1
                ) {
                newState.leading++;
            }
            return newState;

        default:
            throw new Error(`unnamed action type : ${action.type}`);
    }
}