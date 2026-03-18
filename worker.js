export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    let response;
    try {
      response = await env.ASSETS.fetch(request);
    } catch {
      return new Response('Not Found', { status: 404 });
    }

    if (response.status === 404) {
      // SPA fallback: serve index.html for unknown paths
      try {
        const indexRequest = new Request(new URL('/', url).toString(), request);
        response = await env.ASSETS.fetch(indexRequest);
      } catch {
        return new Response('Not Found', { status: 404 });
      }
    }

    if (!response.ok) return response;

    const headers = new Headers(response.headers);

    if (url.pathname === '/' || url.pathname.endsWith('.html')) {
      headers.set('cache-control', 'public, max-age=300, stale-while-revalidate=86400');
    } else if (url.pathname.endsWith('.webm') || url.pathname.endsWith('.svg')) {
      headers.set('cache-control', 'public, max-age=2592000, stale-while-revalidate=604800');
    } else {
      headers.set('cache-control', 'public, max-age=31536000, immutable');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
