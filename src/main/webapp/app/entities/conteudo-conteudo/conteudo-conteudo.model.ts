import { BaseEntity } from './../../shared';

export class ConteudoConteudo implements BaseEntity {
    constructor(
        public id?: number,
        public ordem?: number,
        public conteudo?: string,
        public paginaId?: number,
    ) {
    }
}
