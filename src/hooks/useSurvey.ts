import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import {
    SURVEY_ACTIONS,
    initialState,
    surveyReducer,
} from '@/reducers/surveyReducer';

const SURVEY_QUESTIONS_COUNT = 30;

export default function useSurvey() {
    const { push } = useRouter();
    //state 위치
    const [loading, setloading] = useState(false);
    const [state, dispatch] = useReducer(surveyReducer,initialState);

    const {currentQuestion, leading, selected} = state;

    //원하는 상태인지 확인하는 모듈 메서드
    const isDynamicQuestion = (currentQuestion >= 10);
    const nextBlock = (currentQuestion === leading || currentQuestion >= SURVEY_QUESTIONS_COUNT - 1);
    const prevBlock = (currentQuestion === 0);

    const next = () => {
        console.log('next');
        dispatch({type:SURVEY_ACTIONS.NEXT});
    }
    const prev = () => {
        dispatch({type:SURVEY_ACTIONS.PREV});
    }
    const select = (index : number) => {
        dispatch({type:SURVEY_ACTIONS.SELECT, answer:index});
    }

    return {
        //state
        currentQuestion,
        leading,
        selected,
        //get
        isDynamicQuestion,
        nextBlock,
        prevBlock,
        //post
        next,
        prev,
        select,
    };
}