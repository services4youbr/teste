import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoConteudoSharedModule } from '../../shared';
import {
    GrupoConteudoService,
    GrupoConteudoPopupService,
    GrupoConteudoComponent,
    GrupoConteudoDetailComponent,
    GrupoConteudoDialogComponent,
    GrupoConteudoPopupComponent,
    GrupoConteudoDeletePopupComponent,
    GrupoConteudoDeleteDialogComponent,
    grupoRoute,
    grupoPopupRoute,
    GrupoConteudoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...grupoRoute,
    ...grupoPopupRoute,
];

@NgModule({
    imports: [
        ProjetoConteudoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GrupoConteudoComponent,
        GrupoConteudoDetailComponent,
        GrupoConteudoDialogComponent,
        GrupoConteudoDeleteDialogComponent,
        GrupoConteudoPopupComponent,
        GrupoConteudoDeletePopupComponent,
    ],
    entryComponents: [
        GrupoConteudoComponent,
        GrupoConteudoDialogComponent,
        GrupoConteudoPopupComponent,
        GrupoConteudoDeleteDialogComponent,
        GrupoConteudoDeletePopupComponent,
    ],
    providers: [
        GrupoConteudoService,
        GrupoConteudoPopupService,
        GrupoConteudoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetoConteudoGrupoConteudoModule {}
