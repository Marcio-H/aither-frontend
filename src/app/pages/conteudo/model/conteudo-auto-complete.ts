import { Pipe, PipeTransform } from '@angular/core';
import { DisciplinaAutoComplete } from '../../disciplina/model/disciplina-auto-complete';

export interface ConteudoAutoComplete {
  id?: string;
  descricao: string;
  disciplinas: DisciplinaAutoComplete[];
}

@Pipe({ name: 'conteudoAutoComplete' })
export class ConteudoAutoCompletePipe implements PipeTransform {
  transform(value: ConteudoAutoComplete): string {
    return ConteudoAutoCompletePipe.sTransform(value);
  }

  static sTransform(value: ConteudoAutoComplete): string {
    const text: string[] = [];
    text.push(`${value.descricao}`);
    return text.filter((it) => it != null && it.trim() != '').join(' - ');
  }
}
