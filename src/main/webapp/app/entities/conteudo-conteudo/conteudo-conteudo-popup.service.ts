import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ConteudoConteudo } from './conteudo-conteudo.model';
import { ConteudoConteudoService } from './conteudo-conteudo.service';

@Injectable()
export class ConteudoConteudoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private conteudoService: ConteudoConteudoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.conteudoService.find(id)
                    .subscribe((conteudoResponse: HttpResponse<ConteudoConteudo>) => {
                        const conteudo: ConteudoConteudo = conteudoResponse.body;
                        this.ngbModalRef = this.conteudoModalRef(component, conteudo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.conteudoModalRef(component, new ConteudoConteudo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    conteudoModalRef(component: Component, conteudo: ConteudoConteudo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.conteudo = conteudo;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
