import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SiteConteudo } from './site-conteudo.model';
import { SiteConteudoPopupService } from './site-conteudo-popup.service';
import { SiteConteudoService } from './site-conteudo.service';

@Component({
    selector: 'jhi-site-conteudo-delete-dialog',
    templateUrl: './site-conteudo-delete-dialog.component.html'
})
export class SiteConteudoDeleteDialogComponent {

    site: SiteConteudo;

    constructor(
        private siteService: SiteConteudoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.siteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'siteListModification',
                content: 'Deleted an site'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-site-conteudo-delete-popup',
    template: ''
})
export class SiteConteudoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sitePopupService: SiteConteudoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sitePopupService
                .open(SiteConteudoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
