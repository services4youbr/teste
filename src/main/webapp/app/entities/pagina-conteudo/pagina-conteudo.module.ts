import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoConteudoSharedModule } from '../../shared';
import {
    PaginaConteudoService,
    PaginaConteudoPopupService,
    PaginaConteudoComponent,
    PaginaConteudoDetailComponent,
    PaginaConteudoDialogComponent,
    PaginaConteudoPopupComponent,
    PaginaConteudoDeletePopupComponent,
    PaginaConteudoDeleteDialogComponent,
    paginaRoute,
    paginaPopupRoute,
    PaginaConteudoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...paginaRoute,
    ...paginaPopupRoute,
];

@NgModule({
    imports: [
        ProjetoConteudoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PaginaConteudoComponent,
        PaginaConteudoDetailComponent,
        PaginaConteudoDialogComponent,
        PaginaConteudoDeleteDialogComponent,
        PaginaConteudoPopupComponent,
        PaginaConteudoDeletePopupComponent,
    ],
    entryComponents: [
        PaginaConteudoComponent,
        PaginaConteudoDialogComponent,
        PaginaConteudoPopupComponent,
        PaginaConteudoDeleteDialogComponent,
        PaginaConteudoDeletePopupComponent,
    ],
    providers: [
        PaginaConteudoService,
        PaginaConteudoPopupService,
        PaginaConteudoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetoConteudoPaginaConteudoModule {}
