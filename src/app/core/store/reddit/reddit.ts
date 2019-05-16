

export interface Feed {
    author: string;
    title: string;
    link: string;
    upVotes: number;
    thumbnail: string | null;
    date: Date | string;
}

export interface SubReddit {
    name: string;
    after: string;
    feeds: Feed[];
}
