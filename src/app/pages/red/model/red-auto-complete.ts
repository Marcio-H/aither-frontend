import { Pipe, PipeTransform } from '@angular/core';

export interface RedAutoComplete {
  id?: string;
  descricao: string;
}

@Pipe({ name: 'redAutoComplete' })
export class RedAutoCompletePipe implements PipeTransform {
  transform(value: RedAutoComplete): string {
    return RedAutoCompletePipe.sTransform(value);
  }

  static sTransform(value: RedAutoComplete): string {
    const text: string[] = [];
    text.push(`${value.descricao}`);
    return text.filter((it) => it != null && it.trim() != '').join(' - ');
  }
}
