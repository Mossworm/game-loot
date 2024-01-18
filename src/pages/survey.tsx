// 프롭 넘버에 따라서 해당 페이지의 문항을 동적으로 생성하려 했으나, 프로토타입은 별도 쿼리 숫자가 없음.
// 그냥 단일 페이지에서 어떻게든 페이징을 구현할 거임.
// 다음 버튼은 모든 문항이 응답되었는지를 확인하는 기능을 추가할 수 있음.
// 마지막의 다음 버튼은 마지막 페이지일 때 결과 버튼으로 바뀜.

import RadioBtns from "../components/RadioBtns"

const options = [
    {label: '옵션1', value: '옵션1'},
    {label: '옵션2', value: '옵션2'},
];

export default function SurveyPage() {
    return (
        <div>
            첫번째 페이지
            <RadioBtns options={options} onSelect={()=>{}}/>
        </div>
    )
}