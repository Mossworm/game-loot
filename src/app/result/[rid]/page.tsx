"use client"//도넛차트, useState 제거 후 서버사이드로 변경.

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BottomBtn from '@/components/BottomBtn';
import { GameData } from '@/lib/interface';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export default function Result({params}:{params:{rid:string}}) {
  const [places, setPlaces] = useState<GameData[]>();
  const [tags, setTags] = useState<{name:string,acc:number}[]>();

  useEffect(() => {
    async function fetchResult() {
      const result = await fetch(`/api/result?id=${params.rid}`).then(response => response.json());

      const buffer: { name: string, acc: number }[] = result.total;
      const buffer2 = buffer.filter(a => (a.acc >= 3));
      setTags(buffer2);

      setPlaces(result.ranking);
    }
    fetchResult();
  }, []);

  const Section = (props: { text: string, children: React.ReactNode } | any) => {
    const NoWrapHeadLine = (props: any) => {
      return (<div className='text-2xl sm:text-3xl font-extrabold whitespace-nowrap'>{props.text}</div>);}
    const SimpleDivider = () => {
      return (<img className="my-8" src="/images/result/divider.svg" />);}
    return (<><NoWrapHeadLine text={props.text} />{props.children}<SimpleDivider /></>);
  }

  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-y-10 p-8 dark:text-dark-text font-Pret max-w-2xl">

      <div className='h-[10px]'></div>

      {/* 추천 순위 */}
      <Section text='당신에게 추천하는 게임은...'>
        {places && <>
          <div id='1위'>
            <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${places[0]?.appid}/header.jpg`} className="rounded-xl w-[688px] h-[414]" />
            <div className="text-2xl sm:text-3xl font-bold">{places[0]?.name}</div>
            <div className='flex flex-row flex-wrap gap-x-1.5'>
              {places[0]?.tags.map((item,index)=><div key={index} className="text-xs font-medium">{"#" + item}</div>)}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {places.slice(1).map((place,index)=>
              <div key={index}>
              <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${place.appid}/header.jpg`} className="rounded-xl w-[688px] h-[414]" />
              <div className="text-sm sm:text-2xl font-bold">{place.name}</div>
              <div className='flex flex-row flex-wrap gap-x-1.5'>
                {place.tags.map((item,index)=><div key={index} className="text-xs font-medium">{"#" + item}</div>)}
              </div>
            </div>)}
          </div>
        </>}
      </Section>

      {/* 상세 그래프 */}
      <Section text='상세한 결과는...'>
        <div className='max-w-2xl size-full'>
          <Doughnut data={{
            datasets: [{
              data: tags && tags.map((tag) => tag.acc),
              borderWidth: 0,
              hoverBackgroundColor: 'white',
            }],
            labels: tags && tags.map((tag) => tag.name),
          }}></Doughnut>
        </div>
      </Section>

      {/* 다시하기 버튼 */}
      <BottomBtn label='다시하기' onClick={() => window.location.href = "/"} />
    </div>
  )
}
