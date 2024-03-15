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
    * 응답기록을 total로 바꾸는 작업은 FE에서 처리함.(왜냐? ServiceApps를 오픈한 상태이기 때문에. total은 acc 크기에 따라 정렬상태여야 함.)
    req.body:total = {name:string,acc:number}[]
    total -> recommendIndexs : number[]
    total, recommendIndexs -> result : {total, recommendIndexs}
    res:db key(_id)
    acc 구조체에 결과 값을 아래 로직으로 확장함.
    로또 추첨과 유사한 로직으로, 중복 태그가 많은 게임을 우선.
    중복 태그 갯수가 같을 경우, 각 태그의 acc값 총합이 높은 게임을 우선.
    이후 구조체를 db에 저장하고, 키를 반환함.
    키에 오류가 난 경우, 페이지 이동을 금지하는 것이 목표.
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