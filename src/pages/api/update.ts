import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Collection, Db } from "mongodb";

const coll_update_name = "SteamApps";
const coll_service_name = "FinalApps";
const coll_table_name = "PermutationTable";

interface GameData {
    index: number;
    appid: number;
    name: string;
    positivity: number;
    tags: Array<string>;
}

export default async (req : NextApiRequest, res : NextApiResponse) => {
    try {
        const param = req.query;
        const client = await clientPromise;
        const db = client.db("GameLoot");

        if (param.task) {
            switch(param.task) {
                case '1':
                    await reload_from_api(db);
                    console.log('[1] reload from api complete.');
                    res.end();
                    break;

                case '2':
                    const coll_update = db.collection(coll_update_name);
                    const id_arr = (await coll_update.find().toArray()).map(doc=>doc['appid']);
                    for (let appid of id_arr) {
                        const {success} = await append_tag_with_appid(coll_update,appid);
                        if (!success) {
                            console.error('Error while [2] tag collection.');
                            throw new Error('Error while [2] tag collection.');
                        }
                    }
                    console.log('[2] tag collection complete.');
                    res.end();
                    break;

                case '3':
                    await override_to_service(db);
                    console.log('[3] service data update complete.');
                    res.end();
                    break;

                case '4':
                    await update_permutation_table(db,80);
                    console.log('[4] update random table complete.');
                    res.end();
                    break;

                default:
                    console.error(`no such task : [${param.task}]`);
                    res.status(500).send('error');
                    res.errored;
            }
        } else {
            //pipeline
            for (let taskNumber of ['1','2','3','4']) {
                const taskUrl = `http://${req.headers.host}${req.url}?task=${taskNumber}`;
                console.log(`starting pipe task [${taskNumber}], fetching "${taskUrl}"...`);
                const taskRes = await fetch(taskUrl);
                if (!taskRes.ok) {
                    console.error(`pipe crashed at task [${taskNumber}]`);
                    res.status(500).send('error');
                    res.errored;
                }
            }
            console.log('pipeline completed');
            res.end();
        }
    } catch(e) {
        console.error(`error occured : ${e}`);
        res.status(500).send('error');
        res.errored;
    }
}

async function reload_from_api(db : Db) {   //update collection을 드랍하고, 1번 쿼리로 재생성
    const coll_list = (await db.listCollections().toArray()).map(obj=>obj.name);
    if (coll_list.includes(coll_update_name)) db.dropCollection(coll_update_name);
    db.createCollection(coll_update_name);

    const fullAppsData : GameData[] = await fetch('http://steamspy.com/api.php?request=top100in2weeks')
    .then(response => {
        if(!response.ok) {
            throw new Error('api response error');
        }
        return response.json()
    })
    .then(data => {
        Object.keys(data).forEach((key,index) => {
            const value = data[key];
            const positivity = (value.positive/(value.positive + value.negative)).toFixed(2);
            data[key] = {
                index: index,
                appid: value.appid,
                name: value.name,
                positivity: positivity,
                tags: [],
            };
        });
        return Object.values(data);//키를 버리고 배열화하여 반환
    });
    db.collection(coll_update_name).insertMany(fullAppsData);
}

async function append_tag_with_appid(update : Collection, appid : number) : Promise<{success:boolean}> {   //지정한 appid만 업데이트
    try{
        const tags : Array<string> = await fetch(`http://steamspy.com/api.php?request=appdetails&appid=${appid}`)
        .then(response => response.json())
        .then(data => {
            const tags_entries : [string:number] = data['tags'];
            const newAr = Object.entries(tags_entries).sort((a,b)=>b[1]-a[1]);
            if (newAr.length > 6) newAr.length = 6;
            const newOb = Object.fromEntries(newAr);
            const parsed = Object.keys(newOb);
            return parsed;
        });
        await update.findOneAndUpdate({
            "appid" : appid
        },
        {
            $set: {
                "tags" : tags
            }
        });
        console.log(`appid:${appid} > tag appended successfully.`);
        return {success:true};
    } catch(e){
        console.error(`appid:${appid} > tag request Blocked.`);
        return {success:false};
    }
}

async function override_to_service(db : Db) {
    await db.collection(coll_update_name).rename(coll_service_name,{dropTarget:true});
}

async function update_permutation_table(db : Db, demand : number) {
    const coll_list = (await db.listCollections().toArray()).map(obj=>obj.name);

    const domainCount = demand;
    const rangeCount = await db.collection(coll_service_name).countDocuments({});

    if (!coll_list.includes(coll_table_name)) {
        const collection = await db.createCollection('PermutationTable');
        collection.insertOne({
            table: []
        })
    }

    let rangeArray = Array.from({length:rangeCount},(_,i)=>i);
    for (let i=rangeCount-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rangeArray[i],rangeArray[j]] = [rangeArray[j],rangeArray[i]];
    }
    rangeArray = rangeArray.slice(0,domainCount);
    await db.collection(coll_table_name).findOneAndUpdate({},{$set:{table:rangeArray}});
}