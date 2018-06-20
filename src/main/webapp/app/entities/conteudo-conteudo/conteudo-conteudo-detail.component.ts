import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ConteudoConteudo } from './conteudo-conteudo.model';
import { ConteudoConteudoService } from './conteudo-conteudo.service';

@Component({
    selector: 'jhi-conteudo-conteudo-detail',
    templateUrl: './conteudo-conteudo-detail.component.html'
})
export class ConteudoConteudoDetailComponent implements OnInit, OnDestroy {

    conteudo: ConteudoConteudo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private conteudoService: ConteudoConteudoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConteudos();
    }

    load(id) {
        this.conteudoService.find(id)
            .subscribe((conteudoResponse: HttpResponse<ConteudoConteudo>) => {
                this.conteudo = conteudoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConteudos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'conteudoListModification',
            (response) => this.load(this.conteudo.id)
        );
    }
}
