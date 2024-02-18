'use client';
// 설문조사 페이지의 문항 동적 전환을 담당하는 컴포넌트이자 사실상의 페이지 레이아웃.

// 단일 페이지에서 어떻게든 페이징을 구현할 거임.
// 다음 버튼은 모든 문항이 응답되었는지를 확인하는 기능을 추가할 수 있음.
// 마지막의 다음 버튼은 마지막 페이지일 때 결과 버튼으로 바뀜.

import React, { useReducer } from 'react';
import {initialState, questionReducer} from '@/reducers/surveyReducer';
import questions from '@/data/questions-a.json';

export default function SurveyView() {
  const [qState, qDispatch] = useReducer(questionReducer, initialState);
  return (
    <div className='h-[100vh] size-full flex flex-col items-center justify-center font-Pret'>
      <div className='w-96 h-6 bg-green-300'>{qState.currentQuestion+1}번 문제</div>
      <h2 className='w-96 my-4 text-center font-bold'>"{questions[qState.currentQuestion].question}"</h2>
      <div className='flex flex-col gap-4'>
      {qState.currentQuestion < questions.length - 1 ? 
      questions[qState.currentQuestion].answers.map((answer)=>(<button className='w-96 border border-gray-200' onClick={() => qDispatch({type:'next'})}>{answer.answer}</button>)) : 
      questions[qState.currentQuestion].answers.map((answer)=>(<button className='w-96 border border-gray-200' onClick={() => {window.location.href='/'}}>{answer.answer}</button>))}
      </div>
    </div>
  )
}