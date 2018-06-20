import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ConteudoConteudo } from './conteudo-conteudo.model';
import { ConteudoConteudoPopupService } from './conteudo-conteudo-popup.service';
import { ConteudoConteudoService } from './conteudo-conteudo.service';
import { PaginaConteudo, PaginaConteudoService } from '../pagina-conteudo';

@Component({
    selector: 'jhi-conteudo-conteudo-dialog',
    templateUrl: './conteudo-conteudo-dialog.component.html'
})
export class ConteudoConteudoDialogComponent implements OnInit {

    conteudo: ConteudoConteudo;
    isSaving: boolean;

    paginas: PaginaConteudo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private conteudoService: ConteudoConteudoService,
        private paginaService: PaginaConteudoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.paginaService.query()
            .subscribe((res: HttpResponse<PaginaConteudo[]>) => { this.paginas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.conteudo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.conteudoService.update(this.conteudo));
        } else {
            this.subscribeToSaveResponse(
                this.conteudoService.create(this.conteudo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ConteudoConteudo>>) {
        result.subscribe((res: HttpResponse<ConteudoConteudo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ConteudoConteudo) {
        this.eventManager.broadcast({ name: 'conteudoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPaginaById(index: number, item: PaginaConteudo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-conteudo-conteudo-popup',
    template: ''
})
export class ConteudoConteudoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private conteudoPopupService: ConteudoConteudoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.conteudoPopupService
                    .open(ConteudoConteudoDialogComponent as Component, params['id']);
            } else {
                this.conteudoPopupService
                    .open(ConteudoConteudoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
