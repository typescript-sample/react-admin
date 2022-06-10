import { Attributes, Filter, Service, Tracking } from 'onecore';

export interface Article {
    id: string;
    title?: string;
    description?: string;
}

export interface ArticleFilter extends Filter {
    id: string;
    title?: string;
    description?: string;
}


export const articleModel: Attributes = {
    id: {
        key: true,
        length: 40,
        required: true,
    },
    title: {
        length: 100,
        required: true,
        q: true
    },
    description: {
        length: 100,
        required: true,
        q: true
    }
};

export interface ArticleService extends Service<Article, string, ArticleFilter> {
}
