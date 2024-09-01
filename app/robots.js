import { userAgent } from 'next/server';
import sitemap from './sitemap';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `https://www.cosmicadv.com/sitemap.xml`,
  };
}
