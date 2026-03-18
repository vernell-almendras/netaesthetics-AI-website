export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    url.hostname = 'neta-ai.pages.dev';
    url.protocol = 'https:';

    const response = await fetch(url.toString(), request);
    const resHeaders = new Headers(response.headers);
    resHeaders.set('cache-control', 'public, max-age=120, stale-while-revalidate=86400');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: resHeaders,
    });
  }
};
