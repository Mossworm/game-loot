import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

const coll_service_name = "FinalApps";
const coll_table_name = "PermutationTable";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const {gid} = req.query;
		if (typeof(gid) != "string") throw new Error('given query is not in form of "games/<number>"');
		const client = await clientPromise;
		const db = client.db("GameLoot");
		const coll_service = db.collection(coll_service_name);
		
		const group_size = 4;
		const group_head = (parseInt(gid) - 1) * group_size;
		
		const p_table : Array<number> = (await db.collection(coll_table_name).findOne({}))?.table;

		if (group_head + group_size > p_table.length) {
			res.end('query index overflow');
			return;
		}
		const filter = Array.from({length:group_size},(_,i)=>({index:{$eq:p_table[group_head+i]}}));
		console.log(filter);
		const found = await coll_service.find({$or:filter}).toArray();
		res.json(found);
	} catch (e) {
		console.error(e);
		res.end(`error : ${e}`);
	}
}