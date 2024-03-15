import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { BSON, ObjectId } from "mongodb";

const coll_service_name = "FinalApps";
const coll_results_name = "UserResults";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        if(req.method=='GET') {
            const {id} = req.query;
            if(typeof(id)!="string") {
                res.status(504).send('request incomplete');
            } else {
                const db = (await clientPromise).db("GameLoot");
                const results = db.collection(coll_results_name);
    
                const doc_result_found = await results.findOne({_id:new BSON.ObjectId(id)});
                res.json(doc_result_found);
            }
        }
        if(req.method=='POST') {
            const total : {name:string,acc:number}[] = JSON.parse(req.body);
            const db = (await clientPromise).db("GameLoot");
    
            const service = db.collection(coll_service_name);
            const results = db.collection(coll_results_name);
    
            //find the winner
            const ranking = new Array<any>;
            const names = total.map(obj=>obj.name);
    
            let limit = 6;
            while(ranking.length < 5) {
                const hands = await service.find({tags:{$all:names.slice(0,limit)}}).toArray();
                console.log("hands >> " + hands.map(e=>e.name));
                for (let hand of hands) {
                    let flag = 0;
                    for (let rank of ranking) {
                        if (rank.index === hand.index) flag = 1;
                    }
                    if (!flag && ranking.length < 5) ranking.push(hand);
                }
                limit--;
            }
            const doc_result = {
                total: total,
                ranking: ranking,
                best_appid: null,
            }
            const {insertedId} = await results.insertOne(doc_result);
            res.json(insertedId.toHexString());
        }
        else {
            res.status(504).send('Request should be POST');
        }
    } catch(e) {
        res.status(500).send(`Error : ${e}`);
        console.error(e);
    }
}