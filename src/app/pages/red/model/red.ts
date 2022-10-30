import { ConteudoAutoComplete } from '../../conteudo/model/conteudo-auto-complete';
import { DisciplinaAutoComplete } from '../../disciplina/model/disciplina-auto-complete';

export interface Red {
  id?: string;
  titulo: string;
  descricao: string;
  autor: string;
  imagem: any;
  endereco: string;
  // TODO: model usuarioDTO
  // criadoPor: Usuario
  disciplinas: DisciplinaAutoComplete[];
  conteudos: ConteudoAutoComplete[];
}
