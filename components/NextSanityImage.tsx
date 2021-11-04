import { FC } from 'react';
import { IMedia } from '../lib/sanityTypes';
import { ImageProps } from 'next/image';
import Img from 'next/image';
import { sanityClient } from '../lib/config';
import { useNextSanityImage } from 'next-sanity-image';

type NextSanityImageProps = {
    media: IMedia;
    alt: string;
    height?: number;
    width?: number;
    responsive: boolean;
};

const NextSanityImage: FC<NextSanityImageProps> = ({
    media,
    responsive,
    ...rest
}) => {
    const props = useNextSanityImage(sanityClient, media);
    return (
        <Img
            {...props}
            {...rest}
            layout={responsive ? 'responsive' : 'intrinsic'}
        />
    );
};

export default NextSanityImage;
