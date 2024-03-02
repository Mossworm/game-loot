"use client";

import React from 'react'

export default function RetryBtn() {
    return (
        <button className="w-72 h-20 bg-light-button dark:bg-dark-button rounded-xl place-content-center text-dark-text" onClick={() => window.location.href = "/"}>
            테스트 다시하기
        </button>
    )
}
