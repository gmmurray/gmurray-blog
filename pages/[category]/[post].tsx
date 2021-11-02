import { postQuery, postsQuery } from '../../lib/sanityQueries';

import { FC } from 'react';
import { GetStaticProps } from 'next';
import { IPost } from '../../lib/sanityTypes';
import Link from 'next/link';
import PortableText from '../../components/PortableText';
import { getCategoryHref } from '../../lib/routeHelpers';
import { sanityClient } from '../../lib/config';

type PostProps = {
    post: IPost;
};

const Post: FC<PostProps> = ({ post }) => {
    return (
        <div>
            <div>
                <Link href={getCategoryHref(post.category)}>
                    back to category
                </Link>
            </div>
            <div>
                <h2>{post.title}</h2>
                <ul>
                    <li>{post.category.title}</li>
                    <li>
                        tags
                        <ul>
                            {(post.tags ?? []).map(tag => (
                                <li key={tag.value}>{tag.label}</li>
                            ))}
                        </ul>
                    </li>
                    <li>{post.publishedAt}</li>
                </ul>
            </div>
            <div>
                <PortableText blocks={post.body} />
            </div>
        </div>
    );
};

export default Post;

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const post = await sanityClient.fetch<IPost[]>(postQuery, {
        slug: params?.post,
    });

    return {
        props: {
            post: post[0],
        },
    };
};

export const getStaticPaths = async () => {
    const paths = await sanityClient.fetch<IPost[]>(postsQuery);
    return {
        paths: paths.map(({ slug, category }) => ({
            params: { post: slug.current, category: category.slug.current },
        })),
        fallback: false,
    };
};
