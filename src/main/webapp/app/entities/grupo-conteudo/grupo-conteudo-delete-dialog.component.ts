import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GrupoConteudo } from './grupo-conteudo.model';
import { GrupoConteudoPopupService } from './grupo-conteudo-popup.service';
import { GrupoConteudoService } from './grupo-conteudo.service';

@Component({
    selector: 'jhi-grupo-conteudo-delete-dialog',
    templateUrl: './grupo-conteudo-delete-dialog.component.html'
})
export class GrupoConteudoDeleteDialogComponent {

    grupo: GrupoConteudo;

    constructor(
        private grupoService: GrupoConteudoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.grupoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'grupoListModification',
                content: 'Deleted an grupo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-grupo-conteudo-delete-popup',
    template: ''
})
export class GrupoConteudoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private grupoPopupService: GrupoConteudoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.grupoPopupService
                .open(GrupoConteudoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
