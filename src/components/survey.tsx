'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSurvey from '@/hooks/useSurvey';
import { GameData } from "@/lib/interface";
import BottomBtn from '@/components/BottomBtn';
import questions from '@/data/questions.json';

const MAX_QUESTION_COUNT = 30;

export default function SurveyView() {
  const router = useRouter();

  const {
    currentQuestion, leading, selected,
    isDynamicQuestion, nextBlock, prevBlock,
    next, prev, select,
  } = useSurvey();
  const [data, setData] = useState<Array<GameData | undefined>>();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const respond: {
        unsorted: Array<GameData>,
        table: Array<number>,
      } = await fetch('api/games').then(res => res.json());
      setData(respond.table.map((qind) => (respond.unsorted.find(obj => obj.index === qind))));
    }
    fetchData();
  }, []);

  async function handleResult() {
    setloading(true);
    try {
      let acc: { [key: string]: number } = {};
      for (let i = 0; i < MAX_QUESTION_COUNT; i++) {
        if (i < questions.length) {
          questions[i].answers[selected[i]].score.forEach((item) => {
            if (acc[item]) acc[item] += 1;
            else acc[item] = 1;
          });
        } else {
          data && data[4 * (i - 10) + selected[i]]?.tags.map((item) => {
            if (acc[item]) acc[item] += 1;
            else acc[item] = 1;
          });
        }
      }
      const acc_arr = Object.entries(acc).toSorted((a, b) => (b[1] - a[1])).map(([n, a]) => ({ name: n, acc: a }));
  
      const result_id = await fetch('api/result', { method: 'POST', body: JSON.stringify(acc_arr) }).then(res => res.json());
      router.push(`/result/${result_id}`);
    } catch(e) {
      console.log(`Error while Resulting: ${e}`);
      setloading(false);
    }
  };

  const progressStyle = {
    width: (leading/3*10).toFixed().toString() +'%',
  }

  const PagingBtn = (props:any) => {
    return (
      <button className={"w-32 h-12 text-base rounded-xl place-content-center bg-light-primary dark:bg-dark-primary dark:text-dark-text border-dark-primary-1 dark:border-light-primary-1 disabled:opacity-20 disabled:border-dotted disabled:border-[3px]"} 
      onClick={props.onClick} disabled={props.disabled}>{props.label}</button>
    )
  }

  return (
    <div className='flex flex-col sm:max-w-xl sm:w-full py-4 text-xs sm:text-md font-Pret dark:text-dark-text'>
      <div className='flex flex-col gap-4 m-4 pt-8 sm:pt-16'>
        <div className='flex flex-row gap-4 items-center justify-between'>
          <PagingBtn label='이전' onClick={prev} disabled={prevBlock}></PagingBtn>
          <h1 className='text-4xl sm:text-5xl font-bold font-Outfit '>#{currentQuestion + 1}</h1>
          <PagingBtn label='다음' onClick={next} disabled={nextBlock}></PagingBtn>
        </div>
        <div className="flex flex-col gap-4 rounded-xl sm:p-8 sm:bg-light-primary sm:dark:bg-dark-primary">
          
          {/* 프로그레스 바 */}
          <div className='w-full h-4 bg-light-button-low dark:bg-dark-button-low rounded-xl overflow-hidden'>
            <div className={'transition size-full bg-light-button dark:bg-dark-button '} style={progressStyle}></div>
          </div>

          {/* 문제 지문 */}
          {!isDynamicQuestion ?
          <>
            <p className='text-center my-4 text-base sm:text-xl font-bold'>{questions[currentQuestion].question}</p>
            <img className='rounded-xl w-full' src="https://blog.kakaocdn.net/dn/cPArqv/btrGf1LEkaj/cJ1Vm1EzaHllqffmaYqKmK/img.png" />
          </>
            :<p className='text-center text-sm sm:text-xl font-bold'>가장 마음에 드는 게임을 고르세요.</p>
          }

          {/* 문제 보기 */}
          {!isDynamicQuestion ?
            questions[currentQuestion].answers.map((answer, index) => (<button key={index} className=
              {'p-2 bg-light-primary-1 dark:bg-dark-primary-1 sm:text-lg rounded-xl disabled:brightness-75 disabled:border-2'}
              onClick={() => select(index)} disabled={selected[currentQuestion] === index}>{answer.answer}</button>))
            :
            data && data.slice(4 * (currentQuestion - 10), 4 * (currentQuestion - 9)).map((item, index) => (<button key={index} className=
              {'p-2 bg-light-primary-1 dark:bg-dark-primary-1 rounded-xl disabled:brightness-75 disabled:border-2'}
              onClick={() => select(index)} disabled={selected[currentQuestion] === index}>
              <h1 className='sm:text-2xl font-bold text-left'>{item?.name}</h1>
              <div className='rounded-xl flex flex-row overflow-hidden'>
                <img className='max-w-[50%]' src={`https://cdn.akamai.steamstatic.com/steam/apps/${item?.appid}/header.jpg`} />
                <div className='pl-2'>
                  <div className='flex flex-row flex-wrap gap-1'>
                    {item?.tags.map((item, index) => <div key={index} className="bg-light-button dark:bg-dark-button max-[400px]:text-[8px] text-white px-[4px] flex rounded-md">{item}</div>)}
                  </div>
                </div>
              </div>
            </button>))
          }

        </div>
      </div>
      {
        leading >= (MAX_QUESTION_COUNT - 1) &&
        <div className={'flex justify-center ' + (leading != MAX_QUESTION_COUNT ? "opacity-20" : "drop-shadow-lg")}>
          <BottomBtn label='결과보기' disabled={leading != MAX_QUESTION_COUNT} onClick={handleResult} />
        </div>
      }
      {
        loading &&
      <div className='fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 '>
        <img src='/favicon.svg' className='animate-bounce relative top-[47vh] mx-auto size-32 rounded-full shadow-xl'/>
      </div>
      }
    </div>
  )
}