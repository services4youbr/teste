import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PaginaConteudo } from './pagina-conteudo.model';
import { PaginaConteudoPopupService } from './pagina-conteudo-popup.service';
import { PaginaConteudoService } from './pagina-conteudo.service';

@Component({
    selector: 'jhi-pagina-conteudo-delete-dialog',
    templateUrl: './pagina-conteudo-delete-dialog.component.html'
})
export class PaginaConteudoDeleteDialogComponent {

    pagina: PaginaConteudo;

    constructor(
        private paginaService: PaginaConteudoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paginaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'paginaListModification',
                content: 'Deleted an pagina'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pagina-conteudo-delete-popup',
    template: ''
})
export class PaginaConteudoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paginaPopupService: PaginaConteudoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.paginaPopupService
                .open(PaginaConteudoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
