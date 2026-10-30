import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site ? site.toString().replace(/\/$/, '') : 'https://mitce.run';
  const content = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Major Search Engine Crawlers (Explicit Allow)',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: bingbot',
    'Allow: /',
    '',
    'User-agent: Baiduspider',
    'Allow: /',
    '',
    'User-agent: yisouspider',
    'Allow: /',
    '',
    'User-agent: Sogouspider',
    'Allow: /',
    '',
    'User-agent: 360Spider',
    'Allow: /',
    '',
    `Sitemap: ${base}/sitemap.xml`,
    `Sitemap: ${base}/sitemap-index.xml`,
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
