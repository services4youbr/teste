import { BaseEntity } from './../../shared';

export class GrupoConteudo implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public siteId?: number,
        public paginas?: BaseEntity[],
    ) {
    }
}
