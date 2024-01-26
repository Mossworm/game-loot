// "use client";

import Link from "next/link";
import ClientContainer from "./ClientContainer";

type GameData = {
    appid: number;
    name: string;
    developer: string;
    publisher: string;
    score_rank?: string;
    positive: number;
    negative: number;
    userscore: number;
    owners: string;
    average_forever: number;
    average_2weeks: number;
    median_forever: number;
    median_2weeks: number;
    price: string;
    initialprice: string;
    discount: string;
    ccu: number;
};
export default async function page() {

    const targetUrl = 'https://steamspy.com/api.php?request=tag&tag=City Builder';

    const resp = await fetch(targetUrl);
    const data = await resp.json();

    // 확인을 위해 데이터 출력
    console.log(data);

    const apps: GameData[] = Object.values(data);

    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <h2 className="flex items-center justify-center">Steam Game Search by Tag</h2>
                <div className="flex items-center justify-center">
                    <Link
                        href="https://steamspy.com/tag/">
                        (태그 목록들 보기)
                    </Link>
                </div>
                <br />
                띄어쓰기없이 쉼표로 구분하여 입력해주세요.
                <ClientContainer />
                <br />
                <div>
                    <ul>
                        {apps.slice(0, 10).map((game) => (
                            <li key={game.appid}>{game.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
