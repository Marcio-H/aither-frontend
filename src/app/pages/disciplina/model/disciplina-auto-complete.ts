import { Pipe, PipeTransform } from '@angular/core';

export interface DisciplinaAutoComplete {
  id?: string;
  descricao: string;
}

@Pipe({ name: 'disciplinaAutoComplete' })
export class DisciplinaAutoCompletePipe implements PipeTransform {
  transform(value: DisciplinaAutoComplete): string {
    return DisciplinaAutoCompletePipe.sTransform(value);
  }

  static sTransform(value: DisciplinaAutoComplete): string {
    const text: string[] = [];
    text.push(`${value.descricao}`);
    return text.filter((it) => it != null && it.trim() != '').join(' - ');
  }
}
