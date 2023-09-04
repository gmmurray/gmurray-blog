import { ICategory, IPost } from '../lib/sanityTypes';
import { categoriesQuery, postsQuery } from '../lib/sanityQueries';

import { GetServerSideProps } from 'next';
import { baseWebsiteUrl } from '../lib/staticContent';
import { sanityClient } from '../lib/config';

function generateSiteMap(posts: IPost[], categories: ICategory[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${baseWebsiteUrl}</loc>
     </url>
     ${categories
         .map(c => {
             return `
        <url>
          <loc>${baseWebsiteUrl}/${c.slug.current}</loc>
        </url>
      `;
         })
         .join('')}
      ${posts
          .map(post => {
              return `
        <url>
          <loc>${baseWebsiteUrl}/${post.category.slug.current}/${post.slug.current}</loc>
        </url>
      `;
          })
          .join('')}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const [posts, categories] = await Promise.all([
        sanityClient.fetch<IPost[]>(postsQuery),
        sanityClient.fetch<ICategory[]>(categoriesQuery),
    ]);

    // We generate the XML sitemap
    const sitemap = generateSiteMap(posts, categories);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default SiteMap;
