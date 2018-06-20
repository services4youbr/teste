import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PaginaConteudo } from './pagina-conteudo.model';
import { PaginaConteudoPopupService } from './pagina-conteudo-popup.service';
import { PaginaConteudoService } from './pagina-conteudo.service';
import { GrupoConteudo, GrupoConteudoService } from '../grupo-conteudo';

@Component({
    selector: 'jhi-pagina-conteudo-dialog',
    templateUrl: './pagina-conteudo-dialog.component.html'
})
export class PaginaConteudoDialogComponent implements OnInit {

    pagina: PaginaConteudo;
    isSaving: boolean;

    grupos: GrupoConteudo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private paginaService: PaginaConteudoService,
        private grupoService: GrupoConteudoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.grupoService.query()
            .subscribe((res: HttpResponse<GrupoConteudo[]>) => { this.grupos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pagina.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paginaService.update(this.pagina));
        } else {
            this.subscribeToSaveResponse(
                this.paginaService.create(this.pagina));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PaginaConteudo>>) {
        result.subscribe((res: HttpResponse<PaginaConteudo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PaginaConteudo) {
        this.eventManager.broadcast({ name: 'paginaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackGrupoById(index: number, item: GrupoConteudo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pagina-conteudo-popup',
    template: ''
})
export class PaginaConteudoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paginaPopupService: PaginaConteudoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.paginaPopupService
                    .open(PaginaConteudoDialogComponent as Component, params['id']);
            } else {
                this.paginaPopupService
                    .open(PaginaConteudoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
