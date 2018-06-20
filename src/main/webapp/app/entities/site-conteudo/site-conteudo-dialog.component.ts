import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SiteConteudo } from './site-conteudo.model';
import { SiteConteudoPopupService } from './site-conteudo-popup.service';
import { SiteConteudoService } from './site-conteudo.service';

@Component({
    selector: 'jhi-site-conteudo-dialog',
    templateUrl: './site-conteudo-dialog.component.html'
})
export class SiteConteudoDialogComponent implements OnInit {

    site: SiteConteudo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private siteService: SiteConteudoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.site.id !== undefined) {
            this.subscribeToSaveResponse(
                this.siteService.update(this.site));
        } else {
            this.subscribeToSaveResponse(
                this.siteService.create(this.site));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SiteConteudo>>) {
        result.subscribe((res: HttpResponse<SiteConteudo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SiteConteudo) {
        this.eventManager.broadcast({ name: 'siteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-site-conteudo-popup',
    template: ''
})
export class SiteConteudoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sitePopupService: SiteConteudoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sitePopupService
                    .open(SiteConteudoDialogComponent as Component, params['id']);
            } else {
                this.sitePopupService
                    .open(SiteConteudoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
