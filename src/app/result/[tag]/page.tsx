import Link from "next/link";

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

export default async function Result(props: { params: { tag: string } }) {

    const targetUrl = `https://steamspy.com/api.php?request=tag&tag=${props.params.tag}`;

    const resp = await fetch(targetUrl);
    const data = await resp.json();

    // 확인을 위해 데이터 출력
    console.log(data);

    const apps: GameData[] = Object.values(data);

    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <h2 className="flex items-center justify-center">
                    당신에게 추천하는 장르는 {props.params.tag} 입니다.
                </h2>
                <div className="flex items-center justify-center">
                    <Link
                        href="https://steamspy.com/tag/">
                        (태그 목록들 보기)
                    </Link>
                </div>
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
    )
}
