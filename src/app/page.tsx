"use client";

import Link from 'next/link'
import {useState} from 'react'

export default function Home() {
  const [isDark, setDark] = useState(false);
  const darkButtonFunc = () => {
    setDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }

  return (
    <main className="main font-Pret text-black dark:text-neutral-200">
      <div className="w-full h-screen relative overflow-hidden">
        <div className="w-full h-full absolute bg-neutral-200 dark:bg-neutral-900" />
        <div className="w-full h-full max-h-[1200px] absolute flex flex-col gap-4 justify-around py-52">
          {/* 타이틀 */}
          <div className="flex flex-col">
            <div className="mx-auto">
              <span className="text-9xl font-normal">G</span>
              <span className="text-8xl font-normal">ame-</span>
              <span className="text-9xl font-normal">BTI</span>
            </div>
            <div className="text-center text-4xl font-bold">나는 어떤 유형의 게이머일까요?</div>
          </div>

          {/* 아이콘 영역 */}
          <div className="mx-auto w-[674px] min-h-32">
            <div className="absolute w-[674px] h-32">
              <img className="w-32 h-32 left-0 top-0 absolute" src="/images/icon_1.svg" />
              <img className="w-32 h-32 left-[182px] top-0 absolute" src="/images/icon_2.svg" />
              <img className="w-32 h-32 left-[364px] top-0 absolute" src="/images/icon_3.svg" />
              <img className="w-32 h-32 left-[546px] top-0 absolute" src="/images/icon_4.svg" />
            </div>
          </div>

          {/* 결과 모달 창 미리보기 */}
          <div className="mx-auto text-center text-blue-600 hover:text-blue-500 text-3xl font-light underline">결과 미리보기</div>

          {/* 작은 라벨 */}
          <div className="mx-auto w-3/4">
            <div className="text-center text-pretty">
              <span className="text-2xl font-medium">게임의</span>
              <span className="text-blue-600 text-2xl font-bold"> 플레이 성향</span>
              <span className="text-2xl font-medium">과 좋아하는 게임 </span>
              <span className="text-blue-600 text-2xl font-bold">장르</span>
              <span className="text-2xl font-medium">를 진단하여 자신의 </span>
              <span className="text-blue-600 text-2xl font-bold">게이밍 유형</span>
              <span className="text-2xl font-medium">을 알아볼 수 있습니다.<br />그리고 </span>
              <span className="text-2xl font-medium underline">그에 맞는 적절한 게임을 추천</span>
              <span className="text-2xl font-medium">해 드립니다.</span>
            </div>
          </div>

          {/* 큰 라벨 */}
          <div className="text-center text-4xl font-bold">로그인 없이 바로 시작하실 수 있습니다!</div>

          {/* 시작 버튼 */}
          <Link href="/survey" className="mx-auto w-[342px] h-24">
            <div className="hover:translate-y-1 flex items-center justify-center w-[342px] h-24 bg-blue-600 hover:bg-blue-500 rounded-[20px] shadow-xl text-white text-5xl">시작</div>
          </Link>

        </div>
        <div className="absolute size-fit right-0 top-0 flex flex-row gap-4 m-4">
          <button className="block size-16 bg-yellow-800" onClick={darkButtonFunc}>눈뽕</button>
          <button className="block size-16 bg-yellow-800" onClick={()=>{}}>대충 버튼</button>
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
