import { BaseEntity } from './../../shared';

export class SiteConteudo implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public url?: string,
        public grupos?: BaseEntity[],
    ) {
    }
}
