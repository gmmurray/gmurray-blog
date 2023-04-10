export const baseContentStatusOptions = ['draft', 'published'] as const;

export interface IBaseContent {
    id: string;
    updatedAt: Date;
    createdAt: Date;
    status: typeof baseContentStatusOptions[number]; // 'published' or 'draft'
}

export interface IAboutContent extends IBaseContent {
    description: string;
    technologies: string[];
    techTree: {};
    imageUrl: string;
}

export interface IPortfolioContent {
    about: IAboutContent;
    experience: {}[];
    featured: {}[];
    other: {}[];
}
