import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GrupoConteudo } from './grupo-conteudo.model';
import { GrupoConteudoPopupService } from './grupo-conteudo-popup.service';
import { GrupoConteudoService } from './grupo-conteudo.service';
import { SiteConteudo, SiteConteudoService } from '../site-conteudo';

@Component({
    selector: 'jhi-grupo-conteudo-dialog',
    templateUrl: './grupo-conteudo-dialog.component.html'
})
export class GrupoConteudoDialogComponent implements OnInit {

    grupo: GrupoConteudo;
    isSaving: boolean;

    sites: SiteConteudo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private grupoService: GrupoConteudoService,
        private siteService: SiteConteudoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.siteService.query()
            .subscribe((res: HttpResponse<SiteConteudo[]>) => { this.sites = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.grupo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.grupoService.update(this.grupo));
        } else {
            this.subscribeToSaveResponse(
                this.grupoService.create(this.grupo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<GrupoConteudo>>) {
        result.subscribe((res: HttpResponse<GrupoConteudo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: GrupoConteudo) {
        this.eventManager.broadcast({ name: 'grupoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSiteById(index: number, item: SiteConteudo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-grupo-conteudo-popup',
    template: ''
})
export class GrupoConteudoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private grupoPopupService: GrupoConteudoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.grupoPopupService
                    .open(GrupoConteudoDialogComponent as Component, params['id']);
            } else {
                this.grupoPopupService
                    .open(GrupoConteudoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
