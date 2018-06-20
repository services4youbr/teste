import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoConteudoSharedModule } from '../../shared';
import {
    SiteConteudoService,
    SiteConteudoPopupService,
    SiteConteudoComponent,
    SiteConteudoDetailComponent,
    SiteConteudoDialogComponent,
    SiteConteudoPopupComponent,
    SiteConteudoDeletePopupComponent,
    SiteConteudoDeleteDialogComponent,
    siteRoute,
    sitePopupRoute,
    SiteConteudoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...siteRoute,
    ...sitePopupRoute,
];

@NgModule({
    imports: [
        ProjetoConteudoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SiteConteudoComponent,
        SiteConteudoDetailComponent,
        SiteConteudoDialogComponent,
        SiteConteudoDeleteDialogComponent,
        SiteConteudoPopupComponent,
        SiteConteudoDeletePopupComponent,
    ],
    entryComponents: [
        SiteConteudoComponent,
        SiteConteudoDialogComponent,
        SiteConteudoPopupComponent,
        SiteConteudoDeleteDialogComponent,
        SiteConteudoDeletePopupComponent,
    ],
    providers: [
        SiteConteudoService,
        SiteConteudoPopupService,
        SiteConteudoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetoConteudoSiteConteudoModule {}
