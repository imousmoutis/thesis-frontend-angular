import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MatPaginatorIntlService extends MatPaginatorIntl {

  private rangeLabelIntl: string;

  constructor(private translateService: TranslateService) {
    super();
    this.getTranslations();
    this.translateService.onLangChange.subscribe(() => this.getTranslations());
  }

  getTranslations() {
    this.translateService.get([
      'itemsPerPage',
      'rangeLabel',
      'firstPage',
      'lastPage',
      'previousPage',
      'nextPage'
    ])
    .subscribe(translation => {
      this.itemsPerPageLabel = translation['itemsPerPage'];
      this.rangeLabelIntl = translation['rangeLabel'];
      this.firstPageLabel = translation['firstPage'];
      this.lastPageLabel = translation['lastPage'];
      this.previousPageLabel = translation['previousPage'];
      this.nextPageLabel = translation['nextPage'];
      this.changes.next();
    });
  }

  getRangeLabel = (page, pageSize, length) => {
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ` + this.rangeLabelIntl + ` ${length}`;
  }
}
