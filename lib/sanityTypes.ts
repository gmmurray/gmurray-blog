export interface ISlug {
    _type: string;
    current: string;
}

export interface ITag {
    label: string;
    value: string;
}

export interface IMedia {
    _type: string;
    asset: {
        _ref: string;
        type: string;
    };
}

export interface PortableText {
    _key: string;
    _type: string;
    children: PortableText[];
    style: string;
    text: string;
}

export interface ISanityEntity {
    _id: string;
    _createdAt: Date;
    _updatedAt: Date;
    _type: string;
}

export interface ICategory extends ISanityEntity {
    title: string;
    slug: ISlug;
    description: string;
}

export interface IPost extends ISanityEntity {
    body: PortableText[];
    category: ICategory;
    mainImage: IMedia;
    mainImageSrc: string;
    publishedAt: Date;
    slug: ISlug;
    summary: string;
    tags: ITag[];
    title: string;
}
