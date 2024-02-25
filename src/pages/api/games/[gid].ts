import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

const coll_service_name = "FinalApps";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { gid } = req.query;
	try {
		const client = await clientPromise;
		const db = client.db("GameLoot");
		const coll_service = db.collection(coll_service_name);
		res.end(`requested group id is ${gid}`);
	} catch (e) {
		console.error(e);
		res.end(`error : ${e}`);
	}
}