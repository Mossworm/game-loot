import Link from 'next/link'

export default function Home() {
  return (
    <main className="main">
      <div className="w-full h-screen relative overflow-hidden justify-center">
        <div className="w-full h-full absolute bg-neutral-200" />
        <div className="w-full h-full absolute flex flex-col justify-around py-52">
          {/* 타이틀 */}
          <div className="flex flex-col">
            <div className="mx-auto">
              <span className="text-black text-9xl font-normal">G</span>
              <span className="text-black text-8xl font-normal">ame-</span>
              <span className="text-black text-9xl font-normal">BTI</span>
            </div>
            <div className="text-center text-black text-4xl font-bold">나는 어떤 유형의 게이머일까요?</div>
          </div>

          {/* 아이콘 영역 */}
          <div className="mx-auto w-[674px] h-32">
            {/* bg-gradient-to-r from-red-700 via-fuchsia-800 to-blue-700 */}
            <div className="w-[674px] h-32">
              <div className="absolute w-[674px] h-32">
                <img className="w-[674] h-32 left-0 top-0 absolute" src="/images/icon_group.svg" />
                {/* <img className="w-32 h-32 left-0 top-0 absolute" src="/images/icon_1.svg" />
                <img className="w-32 h-32 left-[182px] top-0 absolute" src="/images/icon_2.svg" />
                <img className="w-32 h-32 left-[364px] top-0 absolute" src="/images/icon_3.svg" />
                <img className="w-32 h-32 left-[546px] top-0 absolute" src="/images/icon_4.svg" /> */}
              </div>
            </div>
          </div>

          {/* 결과 모달 창 미리보기 */}
          <div className="mx-auto text-center text-blue-600 text-3xl font-extralight underline">결과 미리보기</div>

          {/* 작은 라벨 */}
          <div className="mx-auto w-3/4">
            <div className="text-center text-pretty">
              <span className="text-black text-2xl font-medium">게임의</span>
              <span className="text-blue-600 text-2xl font-medium"> 플레이 성향</span>
              <span className="text-black text-2xl font-medium">과 좋아하는 게임 </span>
              <span className="text-blue-600 text-2xl font-medium">장르</span>
              <span className="text-black text-2xl font-medium">를 진단하여 자신의 </span>
              <span className="text-blue-600 text-2xl font-medium">게이밍 유형</span>
              <span className="text-black text-2xl font-medium">을 알아볼 수 있습니다.<br />그리고 </span>
              <span className="text-black text-2xl font-medium underline">그에 맞는 적절한 게임을 추천</span>
              <span className="text-black text-2xl font-medium">해 드립니다.</span>
            </div>
          </div>
          
          {/* 큰 라벨 */}
          <div className="text-center text-black text-4xl font-bold">로그인 없이 바로 시작하실 수 있습니다!</div>

          {/* 시작 버튼 */}
          <Link href="/survey" className="mx-auto w-[342px] h-24">
            <div className="hover:translate-y-1 flex items-center justify-center w-[342px] h-24 bg-blue-600 hover:bg-blue-500 rounded-[20px] shadow-xl text-white text-5xl">시작</div>
          </Link>

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
