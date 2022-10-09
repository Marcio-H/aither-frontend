import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';

export function buildSearchParams(evt: LazyLoadEvent, query?: string): HttpParams {
  let params = new HttpParams();

  if (evt.first !== undefined && evt.first !== null) {
    const page = (evt.first / (evt.rows || 0)).toFixed(0);

    params = params.set('page', page);
  }
  if (evt.rows) {
    params = params.set('size', evt.rows.toString());
  }
  if (evt.sortField && evt.sortOrder) {
    params = params.set('sort', `${evt.sortField},${evt.sortOrder > 0 ? 'asc' : 'desc'}`);
  }
  if (evt.multiSortMeta) {
    for (const multiSort of evt.multiSortMeta) {
      params = params.append('sort', `${multiSort.field},${multiSort.order > 0 ? 'asc' : 'desc'}`);
    }
  }
  if (query) {
    params = params.append('query', query);
  }
  return params;
}
