/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetoConteudoTestModule } from '../../../test.module';
import { GrupoConteudoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/grupo-conteudo/grupo-conteudo-delete-dialog.component';
import { GrupoConteudoService } from '../../../../../../main/webapp/app/entities/grupo-conteudo/grupo-conteudo.service';

describe('Component Tests', () => {

    describe('GrupoConteudo Management Delete Component', () => {
        let comp: GrupoConteudoDeleteDialogComponent;
        let fixture: ComponentFixture<GrupoConteudoDeleteDialogComponent>;
        let service: GrupoConteudoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoConteudoTestModule],
                declarations: [GrupoConteudoDeleteDialogComponent],
                providers: [
                    GrupoConteudoService
                ]
            })
            .overrideTemplate(GrupoConteudoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GrupoConteudoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GrupoConteudoService);
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
