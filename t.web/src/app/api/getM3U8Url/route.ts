import { exec } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';

function getM3U8Url(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`yt-dlp -g ${url}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(new Error(stderr));
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

async function requestHandler(req: NextRequest): Promise<NextResponse> {
  const { query } = parse(req.url, true);
  const { videoLink } = query;

  if (typeof videoLink !== 'string') {
    return NextResponse.json({ error: 'Invalid query parameter' });
  }

  try {
    const m3u8Url = await getM3U8Url(`https://tver.jp/episodes/${videoLink}`);
    return NextResponse.json({ m3u8Url });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
}

export { requestHandler as GET };