
export async function handler(event, context) {
  try {
    const url = new URL('https://example.com' + (event.rawUrl || ''));
    const photoId = url.searchParams.get('photoId') || 'demo';
    const resp = await fetch(`${url.origin}/data/demo-comments.json`, {cache: 'no-store'});
    const all = await resp.json();
    const list = (all[photoId] || []).slice(0, 50);
    return { statusCode: 200, headers: {"content-type":"application/json"}, body: JSON.stringify(list) };
  } catch (e) {
    return { statusCode: 200, headers: {"content-type":"application/json"}, body: "[]" };
  }
}
