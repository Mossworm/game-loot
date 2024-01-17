import Link from 'next/link'

export default function Home() {
  return (
    <main className="main">
      <div className="w-full h-screen relative overflow-hidden">
        <div className="w-full h-full left-0 top-0 absolute bg-neutral-200" />

        {/* 타이틀 */}
        <div className="w-[525px] h-[204px] left-[692px] top-[124px] absolute">
          <div className="left-[38px] top-[150px] absolute text-center text-black text-4xl font-medium font-['IBM Plex Sans KR']">나는 어떤 유형의 게이머일까요?</div>
          <div className="left-0 top-0 absolute"><span className="text-black text-9xl font-normal font-['Outfit']">G</span><span className="text-black text-8xl font-normal font-['Outfit']">ame-</span><span className="text-black text-9xl font-normal font-['Outfit']">BTI</span></div>
        </div>

        {/* 아이콘 영역 */}
        <div className="w-[674px] h-32 left-[623px] top-[421px] absolute">
          <div className="w-[674px] h-32 left-0 top-0 absolute">
            <img className="w-32 h-32 left-0 top-0 absolute" src="https://via.placeholder.com/128x128" />
            <img className="w-32 h-32 left-[182px] top-0 absolute" src="https://via.placeholder.com/128x128" />
            <img className="w-32 h-32 left-[364px] top-0 absolute" src="https://via.placeholder.com/128x128" />
            <img className="w-32 h-32 left-[546px] top-0 absolute" src="https://via.placeholder.com/128x128" />
          </div>
          <div className="w-[674px] h-32 left-0 top-0 absolute bg-gradient-to-r from-red-700 via-fuchsia-800 to-blue-700" />
        </div>
        
        {/* 결과 미리보기 */}
        <div className="left-[871px] top-[571px] absolute text-center text-blue-600 text-[32px] font-light font-['IBM Plex Sans KR'] underline">결과 미리보기</div>
        
        {/* 라벨들 */}
        <div className="h-[169px] left-[464px] top-[642px] absolute">
          <div className="left-[213px] top-[115px] absolute text-center text-black text-4xl font-medium font-['IBM Plex Sans KR']">로그인 없이 바로 시작하실 수 있습니다!</div>
          <div className="w-[992px] left-0 top-0 absolute text-center"><span className="text-black text-2xl font-medium font-['IBM Plex Sans KR']">게임의</span><span className="text-blue-600 text-2xl font-medium font-['IBM Plex Sans KR']"> 플레이 성향</span><span className="text-black text-2xl font-medium font-['IBM Plex Sans KR']">과 좋아하는 게임 </span><span className="text-blue-600 text-2xl font-medium font-['IBM Plex Sans KR']">장르</span><span className="text-black text-2xl font-medium font-['IBM Plex Sans KR']">를 진단하여 자신의 </span><span className="text-blue-600 text-2xl font-medium font-['IBM Plex Sans KR']">게이밍 유형</span><span className="text-black text-2xl font-medium font-['IBM Plex Sans KR']">을 알아볼 수 있습니다.<br />그리고 </span><span className="text-black text-2xl font-medium font-['IBM Plex Sans KR'] underline">그에 맞는 적절한 게임을 추천</span><span className="text-black text-2xl font-medium font-['IBM Plex Sans KR']">해 드립니다.</span></div>
        </div>
        
        {/* 시작 버튼 */}
        <Link href="/survey" className="w-[342px] h-24 left-[789px] top-[863px] absolute">
          <div className="w-[342px] h-24 left-0 top-0 absolute bg-blue-600 rounded-[20px] shadow" />
          <div className="left-[126px] top-[10px] absolute text-white text-5xl font-normal font-['IBM Plex Sans KR'] leading-[76.80px]">시작</div>
        </Link>

      </div>
      {/* 푸터 */}
      <div className="footer bg-slate-600 h-52 text-center">
        <p className="m-auto text-white">
          © 2024.<br />3443 & mossworm<br />All Rights Reserved.
        </p>
      </div>
    </main>
  )
}
