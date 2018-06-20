import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoConteudoSharedModule } from '../../shared';
import {
    ConteudoConteudoService,
    ConteudoConteudoPopupService,
    ConteudoConteudoComponent,
    ConteudoConteudoDetailComponent,
    ConteudoConteudoDialogComponent,
    ConteudoConteudoPopupComponent,
    ConteudoConteudoDeletePopupComponent,
    ConteudoConteudoDeleteDialogComponent,
    conteudoRoute,
    conteudoPopupRoute,
    ConteudoConteudoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...conteudoRoute,
    ...conteudoPopupRoute,
];

@NgModule({
    imports: [
        ProjetoConteudoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConteudoConteudoComponent,
        ConteudoConteudoDetailComponent,
        ConteudoConteudoDialogComponent,
        ConteudoConteudoDeleteDialogComponent,
        ConteudoConteudoPopupComponent,
        ConteudoConteudoDeletePopupComponent,
    ],
    entryComponents: [
        ConteudoConteudoComponent,
        ConteudoConteudoDialogComponent,
        ConteudoConteudoPopupComponent,
        ConteudoConteudoDeleteDialogComponent,
        ConteudoConteudoDeletePopupComponent,
    ],
    providers: [
        ConteudoConteudoService,
        ConteudoConteudoPopupService,
        ConteudoConteudoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetoConteudoConteudoConteudoModule {}
