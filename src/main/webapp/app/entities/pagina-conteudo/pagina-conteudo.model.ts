import { BaseEntity } from './../../shared';

export class PaginaConteudo implements BaseEntity {
    constructor(
        public id?: number,
        public titulo?: string,
        public nome?: string,
        public grupoId?: number,
        public conteudos?: BaseEntity[],
    ) {
    }
}
