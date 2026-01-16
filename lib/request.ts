import axios from "axios";

import { ENDPOINT } from "@/constants/server"

const API_ENDPOINT = ENDPOINT.MEDIA
const ACTOR_ENDPOINT = ENDPOINT.ACTOR
const TRAND_FILE = ENDPOINT.TRAND

export async function requestTrend() {

    let trendList : string[] = []

    await axios.get(TRAND_FILE, {
        withCredentials: false
    }).then((response) => {
        trendList = response.data.trendList
    })
    .catch((error) =>  {
        console.log("トレンド取得でエラー")
        console.log(error)
    })
   
    return trendList
}

export async function requestData(query: string, actor: string | null, cursor: string, sort: string, sensitive: boolean) {

    var media_data, new_cursor;

    await axios.get(API_ENDPOINT, {
        params: {
        q: query,
        actor: actor,
        cursor: cursor,
        sort:sort,
        sensitive:sensitive
        }
        ,withCredentials: false
    }).then((response) => {
        if (response.data.media_count > 0) {
            media_data = response.data.media_data
            new_cursor = response.data.cursor
        }
    })
    .catch((error) =>  {
        console.log(error)
    })

    return {
        posts: media_data || [],
        hasMore: true,
        cursor: new_cursor || "0",
    }
}

export async function requestActor(query: string) {

    var actorData

    await axios.get(ACTOR_ENDPOINT, {
        params: {
        q: query,
        }
        ,withCredentials: false
    }).then((response) => {
        if (response.data.actorData.length > 0) {
            actorData = response.data.actorData
            // console.log(actorData)
        }
    })
    .catch((error) =>  {
        console.log(error)
    })

    return {
        actors: actorData || [],
    }
}