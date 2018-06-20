import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PaginaConteudo } from './pagina-conteudo.model';
import { PaginaConteudoService } from './pagina-conteudo.service';

@Component({
    selector: 'jhi-pagina-conteudo-detail',
    templateUrl: './pagina-conteudo-detail.component.html'
})
export class PaginaConteudoDetailComponent implements OnInit, OnDestroy {

    pagina: PaginaConteudo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private paginaService: PaginaConteudoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPaginas();
    }

    load(id) {
        this.paginaService.find(id)
            .subscribe((paginaResponse: HttpResponse<PaginaConteudo>) => {
                this.pagina = paginaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPaginas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'paginaListModification',
            (response) => this.load(this.pagina.id)
        );
    }
}
