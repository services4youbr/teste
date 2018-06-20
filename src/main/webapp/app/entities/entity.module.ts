import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProjetoConteudoSiteConteudoModule } from './site-conteudo/site-conteudo.module';
import { ProjetoConteudoGrupoConteudoModule } from './grupo-conteudo/grupo-conteudo.module';
import { ProjetoConteudoPaginaConteudoModule } from './pagina-conteudo/pagina-conteudo.module';
import { ProjetoConteudoConteudoConteudoModule } from './conteudo-conteudo/conteudo-conteudo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ProjetoConteudoSiteConteudoModule,
        ProjetoConteudoGrupoConteudoModule,
        ProjetoConteudoPaginaConteudoModule,
        ProjetoConteudoConteudoConteudoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetoConteudoEntityModule {}
