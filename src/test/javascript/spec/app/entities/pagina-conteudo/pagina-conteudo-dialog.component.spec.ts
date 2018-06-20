/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetoConteudoTestModule } from '../../../test.module';
import { PaginaConteudoDialogComponent } from '../../../../../../main/webapp/app/entities/pagina-conteudo/pagina-conteudo-dialog.component';
import { PaginaConteudoService } from '../../../../../../main/webapp/app/entities/pagina-conteudo/pagina-conteudo.service';
import { PaginaConteudo } from '../../../../../../main/webapp/app/entities/pagina-conteudo/pagina-conteudo.model';
import { GrupoConteudoService } from '../../../../../../main/webapp/app/entities/grupo-conteudo';

describe('Component Tests', () => {

    describe('PaginaConteudo Management Dialog Component', () => {
        let comp: PaginaConteudoDialogComponent;
        let fixture: ComponentFixture<PaginaConteudoDialogComponent>;
        let service: PaginaConteudoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoConteudoTestModule],
                declarations: [PaginaConteudoDialogComponent],
                providers: [
                    GrupoConteudoService,
                    PaginaConteudoService
                ]
            })
            .overrideTemplate(PaginaConteudoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaginaConteudoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaginaConteudoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PaginaConteudo(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.pagina = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'paginaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PaginaConteudo();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.pagina = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'paginaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
