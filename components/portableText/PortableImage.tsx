import NextSanityImage from '../shared/NextSanityImage';
import { PortableTextReactComponents } from '@portabletext/react';
import React from 'react';

const PortableImage: PortableTextReactComponents['types']['image'] = ({
    value,
}) => {
    return <NextSanityImage media={value} alt="" responsive />;
};

export default PortableImage;
