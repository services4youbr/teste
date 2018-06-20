/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetoConteudoTestModule } from '../../../test.module';
import { PaginaConteudoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/pagina-conteudo/pagina-conteudo-delete-dialog.component';
import { PaginaConteudoService } from '../../../../../../main/webapp/app/entities/pagina-conteudo/pagina-conteudo.service';

describe('Component Tests', () => {

    describe('PaginaConteudo Management Delete Component', () => {
        let comp: PaginaConteudoDeleteDialogComponent;
        let fixture: ComponentFixture<PaginaConteudoDeleteDialogComponent>;
        let service: PaginaConteudoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoConteudoTestModule],
                declarations: [PaginaConteudoDeleteDialogComponent],
                providers: [
                    PaginaConteudoService
                ]
            })
            .overrideTemplate(PaginaConteudoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaginaConteudoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaginaConteudoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
