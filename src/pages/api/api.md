임의 양식으로 작성한 api 명세입니다. 이후 정식 명세서로 변경 예정입니다.

games {
    객체 반환:{
        unsorted: 정렬되지 않은 서비스 게임 정보 배열,
        table: unsorted를 사용하기 위한 table,
    }
}

games(index) {
    객체 반환:서비스 상태의 0~79 게임 정보 Document 반환
}

result : POST {
    body 취득:{name:string,acc:number}[]
    로또 추첨과 유사한 로직으로, 중복 태그가 많은 게임을 우선.
    중복 태그 갯수가 같을 경우, 각 태그의 acc값 총합이 높은 게임을 우선.
}

update {
    update(task)의 모든 작업을 순서대로 비동기 실행(vercel에서 현재 최적화 오류 및 타임아웃 발생.)
}

update(task) {
    task = 1:
        steamspy 전체 request를 통한 SteamApps 업데이트.
    task = 2:
        SteamApps의 모든 Document에 tag를 6개까지 갱신하는 작업.(vercel에서 현재 타임아웃 발생.)
    task = 3:
        업데이트된 SteamApps를 기존 FinalApps에 덮어쓰기.
    task = 4:
        PermutationTable을 FinalApps 크기에 맞게 업데이트.
}