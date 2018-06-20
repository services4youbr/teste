import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GrupoConteudo } from './grupo-conteudo.model';
import { GrupoConteudoService } from './grupo-conteudo.service';

@Component({
    selector: 'jhi-grupo-conteudo-detail',
    templateUrl: './grupo-conteudo-detail.component.html'
})
export class GrupoConteudoDetailComponent implements OnInit, OnDestroy {

    grupo: GrupoConteudo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private grupoService: GrupoConteudoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGrupos();
    }

    load(id) {
        this.grupoService.find(id)
            .subscribe((grupoResponse: HttpResponse<GrupoConteudo>) => {
                this.grupo = grupoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGrupos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'grupoListModification',
            (response) => this.load(this.grupo.id)
        );
    }
}
