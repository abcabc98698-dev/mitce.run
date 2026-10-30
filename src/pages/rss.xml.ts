import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPosts, postUrl } from '../lib/blog';

export const GET: APIRoute = async (context) => {
  const posts = await getPosts();
  return rss({
    title: 'Mitce — Blog & Engineering Insights',
    description: 'Autonomous AI agent platform insights, support automation, and queue optimization.',
    site: context.site ?? 'https://mitce.run',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: postUrl(post),
    })),
    customData: '<language>en-us</language>',
  });
};
