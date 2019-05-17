

export interface Feed {
    author: string;
    title: string;
    text: string;
    url: string;
    permalink: string;
    upVotes: number;
    thumbnail: string | null;
    date: Date | number;
}

export interface SubReddit {
    name: string;
    after: string;
    feeds: Feed[];
}
