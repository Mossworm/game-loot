'use client';

import React, {useEffect, useState} from 'react';
import useSurvey from '@/hooks/useSurvey';
import questions from '@/data/questions-a.json';
import { GameData } from "@/lib/interface";
import BottomBtn from '@/components/BottomBtn';

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

  const [data,setData] = useState<Array<GameData|undefined>>();

  useEffect(() => {
    const fetchData = async () => {
      const respond : {
        unsorted: Array<GameData>,
        table: Array<number>,
      } = await fetch('api/games').then(res=>res.json());
      setData(respond.table.map((qind)=>(respond.unsorted.find(obj=>obj.index===qind))));
    }

    fetchData();
  },[]);

  return (
    <div className='flex flex-col sm:max-w-xl sm:w-full gap-4 pt-8 sm:pt-16 text-xs sm:text-md'>
      <div className='flex flex-row gap-4 items-center justify-between'>

        <button className={"w-32 h-12 bg-light-primary dark:bg-dark-primary rounded-xl place-content-center dark:text-dark-text " + (prevBlock && "opacity-30")} onClick={prev}>
          이전
        </button>

        <div className='w-full h-4 bg-light-primary rounded-xl overflow-hidden'>
          <div className={'w-[50%] h-4 bg-light-button'}></div>
        </div>

        <button className={"w-32 h-12 bg-light-primary dark:bg-dark-primary rounded-xl place-content-center dark:text-dark-text " + (nextBlock && "opacity-30")} onClick={next}>
          다음
        </button>

      </div>
      <div className="flex flex-col gap-4 rounded-xl p-4 sm:p-8 bg-light-primary dark:bg-dark-primary dark:text-dark-text">

        {/* 문제 번호 */}
        <h1 className='text-3xl sm:text-5xl font-bold'>#{currentQuestion + 1}</h1>

        {/* 문제 지문 */}
        { !isDynamicQuestion ?
        <div className='mb-8'>
          <p className='min-h-14 text-center text-sm sm:text-xl font-bold'>{questions[currentQuestion].question}</p>
          <img className='rounded-xl w-full' src="https://cdn.akamai.steamstatic.com/steam/apps/1337520/header.jpg?t=1706732251" />
        </div>
        :
          <p className='text-center sm:text-xl font-bold'>가장 마음에 드는 게임을 고르세요.</p>
        }

        {/* 문제 보기 */}
        { !isDynamicQuestion ?
          questions[currentQuestion].answers.map((answer, index) => (<button key={index} className=
            {'p-2 bg-light-primary-1 dark:bg-dark-primary-1 sm:text-lg rounded-xl ' + ((selected[currentQuestion] === index) && 'opacity-30')}
            onClick={() =>select(index)}>{answer.answer}</button>))
          :
          data && data.slice(4*(currentQuestion-10),4*(currentQuestion-9)).map((item, index) => (<button key={index} className=
            {'p-2 bg-light-primary-1 dark:bg-dark-primary-1 rounded-xl ' + ((selected[currentQuestion] === index) && 'opacity-30')}
            onClick={() =>select(index)}>
              <h1 className='sm:text-2xl font-bold text-left'>{item?.name}</h1>
              <div className='rounded-xl flex flex-row overflow-hidden'>
                <img className='max-w-[50%]' src={`https://cdn.akamai.steamstatic.com/steam/apps/${item?.appid}/header.jpg`} />
                <div className='pl-2'>
                  <div className='flex flex-row flex-wrap gap-1 overflow-y-hidden'>
                    {item?.tags.map((item, index)=><div key={index} className="bg-light-button dark:bg-dark-button text-white px-[4px] flex rounded-md">{item}</div>)}
                  </div>
                </div>
              </div>
            </button>))
        }
      
      </div>

      {
        leading >= 29 &&
        <div className={'flex justify-center sm:justify-end ' + (leading != 30 ? "opacity-20" : "drop-shadow-lg")}>
          <BottomBtn label='결과보기' disabled={leading != 30} onClick={()=>{window.location.href = "/result"}} />
        </div>
      }

    </div>
  )
}