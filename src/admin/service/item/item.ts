import { Attributes, Filter, Service, Tracking } from 'onecore';

export interface Item {
    id: string;
    title?: string;
    description?: string;
}

export interface ItemFilter extends Filter {
    id: string;
    title?: string;
    description?: string;
}


export const itemModel: Attributes = {
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

export interface ItemService extends Service<Item, string, ItemFilter> {
}
