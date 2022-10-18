import { DisciplinaAutoComplete } from '../../disciplina/model/disciplina-auto-complete';

export interface Conteudo {
  id?: string;
  descricao: string;
  disciplinas: DisciplinaAutoComplete[];
}
