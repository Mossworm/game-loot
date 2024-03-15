import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "@/lib/mongodb";
import { GameData } from "@/lib/interface";

const coll_service_name = "FinalApps";
const coll_table_name = "PermutationTable";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        const questionIndexQuery = req.query.index
        const client = await clientPromise;
        const db = client.db("GameLoot");
        const coll_service = db.collection(coll_service_name);
        const coll_table = db.collection(coll_table_name);

        const p_table : Array<number> = (await coll_table.findOne())?.table;

        if (questionIndexQuery && typeof(questionIndexQuery) === "string") {
            //find one
            const i = parseInt(questionIndexQuery);
            const findOne = await coll_service.findOne({index:p_table[i]});
            res.json(findOne);
        } else {
            //find all
            const filterArray = Array.from({length:80},(_,i)=>({index:p_table[i]}));
            const unsortedArray = await coll_service.find({$or:filterArray}).toArray();
            const returnObject = {
                unsorted: unsortedArray,
                table: p_table,
            }
            res.json(returnObject);
        }
        
    } catch (e) {
        console.error(e);
        res.end(`error : ${e}`);
    }
}