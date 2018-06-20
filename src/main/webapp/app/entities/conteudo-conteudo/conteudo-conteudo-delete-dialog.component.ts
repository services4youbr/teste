import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ConteudoConteudo } from './conteudo-conteudo.model';
import { ConteudoConteudoPopupService } from './conteudo-conteudo-popup.service';
import { ConteudoConteudoService } from './conteudo-conteudo.service';

@Component({
    selector: 'jhi-conteudo-conteudo-delete-dialog',
    templateUrl: './conteudo-conteudo-delete-dialog.component.html'
})
export class ConteudoConteudoDeleteDialogComponent {

    conteudo: ConteudoConteudo;

    constructor(
        private conteudoService: ConteudoConteudoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.conteudoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'conteudoListModification',
                content: 'Deleted an conteudo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-conteudo-conteudo-delete-popup',
    template: ''
})
export class ConteudoConteudoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private conteudoPopupService: ConteudoConteudoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.conteudoPopupService
                .open(ConteudoConteudoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
