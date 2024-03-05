"use client";

import Link from 'next/link'
import BottomBtn from '@/components/BottomBtn';

export default function Home() {
  return (
    <main className="main font-Pret text-black dark:text-neutral-200">
      <div className="w-full h-screen relative overflow-hidden">
        {/* <div className="w-full h-full absolute bg-neutral-200 dark:bg-neutral-900" /> */}
        <div className="w-full h-full max-h-[1200px] absolute flex flex-col gap-7 items-center justify-around py-52">
          {/* 타이틀 */}
          <div className="flex flex-col gap-3">
            <div className="">
              <span className="text-5xl sm:text-9xl font-semibold">Game Loot</span>
            </div>
            <div className="text-center text-xl sm:text-4xl font-bold">나의 선호 게임 유형 분석과 추천</div>
          </div>

          {
            //#region 아이콘과 설명들
          }

          {/* 아이콘 영역 */}
          <div className="w-full max-w-3xl flex flex-row justify-around">
            <img className="size-16 sm:size-32" src="/images/icon_1.svg" />
            <img className="size-16 sm:size-32" src="/images/icon_2.svg" />
            <img className="size-16 sm:size-32" src="/images/icon_3.svg" />
            <img className="size-16 sm:size-32" src="/images/icon_4.svg" />
          </div>

          {/* 결과 모달 창 미리보기 */}
          {/* <div className="mx-auto text-center text-blue-600 hover:text-blue-500 text-3xl font-light underline">결과 미리보기</div> */}

          {/* 작은 라벨 */}
          <div className="w-3/4">
            <div className="text-center text-pretty font-medium text-lg sm:text-2xl">
              <span>게임의</span>
              <span className="text-blue-600 font-bold"> 플레이 성향</span>
              <span>과 제시되는 게임 </span>
              <span className="text-blue-600 font-bold">선택지</span>
              <span>를 통해 태그를 수집하여 개인 게임 </span>
              <span className="text-blue-600 font-bold">통계</span>
              <span>를 제공해 드립니다.<br />그리고 </span>
              <span className="underline">그에 맞는 적절한 게임을 추천</span>
              <span>해 드립니다.</span>
            </div>
          </div>

          {
            //#endregion
          }
          <div className='max-sm:absolute bottom-0 p-8 flex justify-center w-full px-4'>
            <BottomBtn label='시작' onClick={() => window.location.href = '/survey'} />
          </div>

        </div>
      </div>
      {/* 푸터 */}
      <div className="bg-slate-600 h-[20vh] flex items-center justify-center">
        <p className="m-auto text-white">
          © 2024.<br />3443 & mossworm<br />All Rights Reserved.
        </p>
      </div>
    </main>
  )
}
