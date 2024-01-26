import Link from "next/link";
import ClientContainer from "./ClientContainer";

export default function page() {
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
            </div>
        </div>
    )
}
