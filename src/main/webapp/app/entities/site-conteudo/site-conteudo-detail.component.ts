import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SiteConteudo } from './site-conteudo.model';
import { SiteConteudoService } from './site-conteudo.service';

@Component({
    selector: 'jhi-site-conteudo-detail',
    templateUrl: './site-conteudo-detail.component.html'
})
export class SiteConteudoDetailComponent implements OnInit, OnDestroy {

    site: SiteConteudo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private siteService: SiteConteudoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSites();
    }

    load(id) {
        this.siteService.find(id)
            .subscribe((siteResponse: HttpResponse<SiteConteudo>) => {
                this.site = siteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSites() {
        this.eventSubscriber = this.eventManager.subscribe(
            'siteListModification',
            (response) => this.load(this.site.id)
        );
    }
}
