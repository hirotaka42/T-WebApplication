import axios, { AxiosResponse } from 'axios';

type brightcoveResultType = {
    UID: string;
    Token: string;
    videoId: string;
    brightcoveUrl: string;
    pId: string;
    rId: string;
    videoInfoResponse: string
}



export const getVideoUrl = async (uid: string, token: string, videoId: string): Promise<brightcoveResultType> => {
    const CALLEPISODE_API = process.env.NEXT_PUBLIC_TVER_CALLEPISODE_API;
    if (!CALLEPISODE_API) throw new Error("CALLEPISODE_API is not defined");
    const episodeInfoResponse = await axios.get(`${CALLEPISODE_API}/${videoId}`, {
        params: {
            platform_uid: uid,
            platform_token: token,
        },
        headers: {
            'x-tver-platform-type': 'web'
        }
    });

    // Brightcoveの動画情報の取得
    const videoInfoResponse = await axios.get(`https://statics.tver.jp/content/episode/${videoId}.json`);
    const pId = videoInfoResponse.data.video.accountID;
    const rId = videoInfoResponse.data.video.videoRefID || videoInfoResponse.data.video.videoID;

    // BrightcoveのURLの生成
    const brightcoveUrl = `http://players.brightcove.net/${pId}/default_default/index.html?videoId=${rId}`;
    return {
        UID: uid,
        Token: token,
        videoId: videoId,
        brightcoveUrl: brightcoveUrl,
        pId: pId,
        rId: rId,
        videoInfoResponse: JSON.stringify(videoInfoResponse.data)
    };
};

// URLからvideoIdを抽出するためのヘルパー関数
function extractVideoIdFromUrl(url: string): string {
    // 例: URLが 'https://tver.jp/episodes/ep5w42oz5x' の形式の場合、'ep5w42oz5x' を返す
    const match = url.match(/episodes\/([a-zA-Z0-9]+)/);
    return match ? match[1] : '';
}
