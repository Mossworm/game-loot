import React from 'react'
import Image from 'next/image'

export default function Result() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-10 p-8 dark:text-dark-text">

            <div className='h-[10px]'></div>

            <div className='text-xl font-bold'>당신에게 추천하는 게임은...</div>
            <div>
                <Image
                    src={'/images/result/icon_1.svg'}
                    alt={'Image'}
                    width={688}
                    height={414}
                    className="rounded-xl"
                />
                <div className="text-xl font-bold">HELLDIVERS™ 2</div>
                <div className='flex flex-row gap-x-1.5'>
                    <div className="text-xs font-medium">#액션</div>
                    <div className="text-xs font-medium">#3인칭 슈팅</div>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <Image
                    src={'/images/result/icon_2.svg'}
                    alt={'Image'}
                    width={336}
                    height={191}
                    className="rounded-xl"
                />
                <Image
                    src={'/images/result/icon_3.svg'}
                    alt={'Image'}
                    width={336}
                    height={191}
                    className="rounded-xl"
                />
            </div>

            <img className="" src="/images/result/divider.svg" />

            <div className="font-bold">상세한 결과 그래프</div>

            <div className='grid grid-cols-2 gap-10'>
                <img src="https://via.placeholder.com/240x240" />
                <div className='flex flex-col justify-center gap-y-2'>
                    <div className='flex flex-row gap-x-1 items-center'>
                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                        <div className='text-xs font-bold'>국힘당대표 홍승민 지지율</div>
                    </div>
                    <div className='flex flex-row gap-x-1 items-center'>
                        <div className="w-2 h-2 bg-blue-700 rounded-full" />
                        <div className='text-xs font-bold'>민주당대표 홍승민 지지율</div>
                    </div>
                </div>
            </div>

            <img className="" src="/images/result/divider.svg" />

            <button className="w-72 h-24 bg-gradient-to-b from-gray-300 to-gray-300 rounded-xl place-content-center">
                결과가 마음에 드시나요?
            </button>

        </div>
    )
}
