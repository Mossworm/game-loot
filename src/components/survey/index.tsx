'use client';
// 설문조사 페이지의 문항 동적 전환을 담당하는 컴포넌트이자 사실상의 페이지 레이아웃.

// 단일 페이지에서 어떻게든 페이징을 구현할 거임.
// 다음 버튼은 모든 문항이 응답되었는지를 확인하는 기능을 추가할 수 있음.
// 마지막의 다음 버튼은 마지막 페이지일 때 결과 버튼으로 바뀜.

import React, {useEffect, useState} from 'react';
import useSurvey from '@/hooks/useSurvey';
import questions from '@/data/questions-a.json';
import { GameData } from "@/lib/interface";

export default function SurveyView() {
  const {
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
  } = useSurvey();

  const [data, setData] = useState<Array<GameData>>();

  useEffect(() => {
    const fetchData = async () => {
      const respondData = await fetch('api/games').then(res=>res.json());
      setData(respondData);
    }
    fetchData();
  },[]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row gap-4 items-center justify-between'>

        <button className={"w-32 h-12 bg-light-primary dark:bg-dark-primary rounded-xl place-content-center dark:text-dark-text " + (prevBlock && "opacity-30")} onClick={prev}>
          이전문제
        </button>

        <div className='w-full h-4 bg-light-primary rounded-xl overflow-hidden'>
          <div className={'w-[50%] h-4 bg-light-button'}></div>
        </div>

        <button className={"w-32 h-12 bg-light-primary dark:bg-dark-primary rounded-xl place-content-center dark:text-dark-text " + (nextBlock && "opacity-30")} onClick={next}>
          다음문제
        </button>

      </div>
      <div className="flex flex-col gap-4 rounded-xl p-8 bg-light-primary dark:bg-dark-primary dark:text-dark-text">

        <h1 className='text-3xl font-bold'>#{currentQuestion + 1}</h1>

        { !isDynamicQuestion ?
        <>
          <p className='text-center text-xl font-bold'>{questions[currentQuestion].question}</p>
          <img className='rounded-xl' src="https://cdn.akamai.steamstatic.com/steam/apps/1337520/header.jpg?t=1706732251" />
        </>
        :
          <p className='text-center text-xl font-bold'>가장 마음에 드는 게임을 고르세요.</p>
        }

        { !isDynamicQuestion ?
          questions[currentQuestion].answers.map((answer, index) => (<button key={index} className=
            {'p-2 bg-light-primary-1 dark:bg-dark-primary-1 rounded-xl ' + ((selected[currentQuestion] === index) && 'opacity-30')}
            onClick={() =>select(index)}>{answer.answer}</button>))
          :
          data && data.slice(4*(currentQuestion-10),4*(currentQuestion-9)).map((item, index) => (<button key={index} className=
            {'p-2 bg-light-primary-1 dark:bg-dark-primary-1 rounded-xl ' + ((selected[currentQuestion] === index) && 'opacity-30')}
            onClick={() =>select(index)}>
              <h1 className='text-[20px] font-bold text-left'>{item.name}</h1>
              <div className='flex flex-row items-center'>
                <img className='rounded-xl max-w-[50%]' src={`https://cdn.akamai.steamstatic.com/steam/apps/${item.appid}/header.jpg`} />
                <div className='pl-2'>
                  <div className='flex flex-row flex-wrap gap-1'>
                    {item.tags.map((item, index)=><div key={index} className="bg-light-button dark:bg-dark-button text-[11px] text-white px-[4px] flex rounded-md">{item}</div>)}
                  </div>
                </div>
              </div>
            </button>))
        }
      
      </div>

      {
        leading >= 29 &&
        <div className='flex justify-end'>
          <button className={"w-32 h-12 bg-light-button dark:bg-dark-button rounded-xl place-content-center text-dark-text " + (leading != 30 ? "opacity-20" : "drop-shadow-lg")} disabled={leading != 30} onClick={() => window.location.href = "/result"}>
            결과보기
          </button>
        </div>
      }

    </div>
  )
}