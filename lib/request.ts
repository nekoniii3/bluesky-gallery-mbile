import axios from "axios";

import { ENDPOINT } from "@/constants/server"

const API_ENDPOINT = ENDPOINT.MEDIA
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

export async function requestData(query: string, cursor: string, sort: string, sensitive: boolean) {

    var media_data, new_cursor;

    await axios.get(API_ENDPOINT, {
        params: {
        q: query,
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