import { HttpRequest } from 'axios-core';
import { Client } from 'web-clients';
import { Item, ItemFilter, itemModel, ItemService } from './item';

export * from './item';

export class ItemClient extends Client<Item, string, ItemFilter> implements ItemService {
  constructor(http: HttpRequest, url: string) {
    super(http, url, itemModel);
    
    // this.searchGet = true;
  }
  
  postOnly(s: ItemFilter): boolean {
    return true;
  }
  // search(s: ItemFilter, limit?: number, offset?: number|string, fields?: string[]): Promise<SearchResult<ItemFilter>> {
    
  //   const t = this;
  //   debugger
  //   t.formatSearch(s);
  //   const c = t.config;
  //   const sf = (c && c.fields && c.fields.length > 0 ? c.fields : 'fields');
  //   if (fields && fields.length > 0) {
  //     if (t._keys && t._keys.length > 0) {
  //       for (const key of t._keys) {
  //         if (fields.indexOf(key) < 0) {
  //           fields.push(key);
  //         }
  //       }
  //     }
  //     (s as any)[sf] = fields;
  //   }
  //   const sl = (c && c.limit && c.limit.length > 0 ? c.limit : 'limit');
  //   const sp = (c && c.page && c.page.length > 0 ? c.page : 'page');
  //   (s as any)[sl] = limit;
  //   if (limit && offset) {
  //     if (typeof offset === 'string') {
  //       const sn = (c && c.nextPageToken && c.nextPageToken.length > 0 ? c.nextPageToken : 'nextPageToken');
  //       (s as any)[sn] = offset;
  //     } else {
  //       if (offset >= limit) {
  //         const page = offset / limit + 1;
  //         (s as any)[sp] = page;
  //       }
  //     }
  //   }
  //   const sfl = (c ? c.firstLimit : undefined);
  //   const s1 = optimizeFilter(s, sp, sl, sfl);
  //   if (t.postOnly(s1)) {
  //     const postSearchUrl = t.serviceUrl + '/search';
  //     return t.http.post(postSearchUrl, s1).then(res => buildSearchResultByConfig(s, res, c, t._metamodel, sf));
  //   }
  //   const keys2 = Object.keys(s1);
  //   if (keys2.length === 0) {
  //     const searchUrl = (t.searchGet ? t.serviceUrl + '/search' : t.serviceUrl);
  //     return t.http.get<string|SearchResult<T>>(searchUrl).then(res => buildSearchResultByConfig(s, res, c, t._metamodel, sf));
  //   } else {
  //     const excluding = c ? c.excluding : undefined;
  //     const params = t.makeUrlParameters(s1, sf, excluding);
  //     let searchUrl = (t.searchGet ? t.serviceUrl + '/search' : t.serviceUrl);
  //     searchUrl = searchUrl + '?' + params;
  //     if (searchUrl.length <= 255) {
  //       return t.http.get<string|SearchResult<T>>(searchUrl).then(res => buildSearchResultByConfig(s, res, c, t._metamodel, sf));
  //     } else {
  //       const postSearchUrl = t.serviceUrl + '/search';
  //       return t.http.post<string|SearchResult<T>>(postSearchUrl, s1).then(res => buildSearchResultByConfig(s, res, c, t._metamodel, sf));
  //     }
  //   }
  // }
}
