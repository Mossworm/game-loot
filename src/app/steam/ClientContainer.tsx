"use client";
import { useState } from "react";

export default function ClientContainer() {

    const [displayText, setDisplayText] = useState('')

    const addText = (text: string) => {
        setDisplayText(text)
    }

    return (
        <form>
            <p>
                <textarea name="gameTag" placeholder="Please enter the tags" className="block p-2.5 mx-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
            </p>
            <br />
            <div className="flex items-center justify-center">
                <input
                    type="button"
                    value="불러오기"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                        fetch('http://steamspy.com/api.php?request=tag&tag=Batman')
                            .then((response) => response.text(), (error) => { console.log(error); })
                            .then((result) => { addText(JSON.stringify(result)); });
                    }}
                />
            </div>
            {displayText && (
                <div>
                    <br />
                    <p>{displayText}</p>
                </div>
            )}
        </form>
    )
}
