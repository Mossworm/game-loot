"use client"//도넛차트, useState 제거 후 서버사이드로 변경.

import React, { useState, useEffect, ReactElement } from 'react'
import Image from 'next/image'
import BottomBtn from '@/components/BottomBtn'
import {Chart as ChartJS, ArcElement, Tooltip, Legend, Colors, DoughnutController} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement,Tooltip,Legend,Colors);

const NoWrapHeadLine = (props : any) => {
  return (<div className='text-2xl sm:text-3xl font-bold whitespace-nowrap'>{props.text}</div>);
}

const SimpleDivider = () => {
  return (<img className="my-8" src="/images/result/divider.svg" />);
}

const Section = (props:{text:string,children:React.ReactNode}|any) => {
  return (<><NoWrapHeadLine text={props.text}/>{props.children}<SimpleDivider/></>);
}

export default function Result() {
  const initial_tags = [
    {name:"TAG1", acc:15},
    {name:"TAG2", acc:14},
    {name:"TAG3", acc:8},
    {name:"TAG4", acc:8},
    {name:"TAG5", acc:5},
    {name:"TAG6", acc:3},
    {name:"ETC", acc:10},
  ];
  const [tags,setTags] = useState(initial_tags);
return (
    <div className="mx-auto flex flex-col items-center justify-center gap-y-10 p-8 dark:text-dark-text max-w-2xl">

      <div className='h-[10px]'></div>

      {/* 추천 순위 */}
      <Section text='당신에게 추천하는 게임은...'>
        <div id='1위'>
          <Image
            src={'/images/result/icon_1.svg'}
            alt={'Image'}
            width={688}
            height={414}
            className="rounded-xl"
          />
          <div className="text-2xl sm:text-3xl font-bold">{"HELLDIVERS™ 2"}</div>
          <div className='flex flex-row gap-x-1.5'>
            <div className="text-xs font-medium">{"#태그"}</div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div id='2위'>
            <Image
              src={'/images/result/icon_2.svg'}
              alt={'Image'}
              width={336}
              height={191}
              className="rounded-xl"
            />
            <div className="text-sm sm:text-2xl font-bold">{"HELLDIVERS™ 2"}</div>
            <div className='flex flex-row gap-x-1.5'>
              <div className="text-xs font-medium">{"#태그"}</div>
            </div>
          </div>
          <div id='3위'>
            <Image
              src={'/images/result/icon_3.svg'}
              alt={'Image'}
              width={336}
              height={191}
              className="rounded-xl"
            />
            <div className="text-sm sm:text-2xl font-bold">{"HELLDIVERS™ 2"}</div>
            <div className='flex flex-row gap-x-1.5'>
              <div className="text-xs font-medium">{"#태그"}</div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* 상세 그래프 */}
      <Section text='상세한 결과는...'>
        <div className='max-w-2xl size-full'>
          <Doughnut data={{
            datasets: [{
              data:tags.map((tag)=>tag.acc),
              borderWidth: 0,
              hoverBackgroundColor:'white',
            }],
            labels:tags.map((tag)=>tag.name),
          }}></Doughnut>
        </div>
      </Section>

      {/* 다시하기 버튼 */}
      <BottomBtn label='다시하기' onClick={() => window.location.href = "/"} />

    </div>
  )
}
