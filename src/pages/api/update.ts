import clientPromise from "@/lib/mongodb";
import { Collection, Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const coll_update_name = "SteamApps";
const coll_service_name = "FinalApps";

interface GameData {
    appid: number;
    name: string;
    positivity: number;
    tags: Array<string>;
}

export default async (req : NextApiRequest, res : NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("GameLoot");
        const coll_update = db.collection(coll_update_name);
    
        //drop and reload base data from api.
        await reload_from_api(db);
        res.write('reload from api complete.\n');
        
        //tag collect iterator.
        const base_arr = await coll_update.find().toArray()
        for (let doc of base_arr) {
            await append_tag_with_appid(coll_update,doc['appid'])
        }
        res.write('tag collect complete.\n');
        
        //override current service data by renaming collection.
        await override_to_service(db);

        res.end('Daily update complete.\n');
    } catch(e) {
        console.error(e);
        res.end(`error occured : ${e}`);
    }
}

async function reload_from_api(db : Db) {   //update collection을 드랍하고, 1번 쿼리로 재생성
    db.dropCollection(coll_update_name);
    const fullAppsData : GameData[] = await fetch('http://steamspy.com/api.php?request=top100in2weeks')
    .then(response => response.json())
    .then(data => {
        Object.keys(data).forEach(key => {
            const value = data[key];
            const positivity = (value.positive/(value.positive + value.negative)).toFixed(2);
            data[key] = {
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

async function append_tag_with_appid(update : Collection, appid : number) {   //지정한 appid만 업데이트
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
    if (tags.length != 0) console.log(`appid:${appid} > tag appended successfully.`);
    else console.error(`appid:${appid} > request Blocked.`)
}

async function override_to_service(db : Db) {
    db.collection(coll_update_name).rename(coll_service_name,{dropTarget:true});
}