/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetoConteudoTestModule } from '../../../test.module';
import { ConteudoConteudoDialogComponent } from '../../../../../../main/webapp/app/entities/conteudo-conteudo/conteudo-conteudo-dialog.component';
import { ConteudoConteudoService } from '../../../../../../main/webapp/app/entities/conteudo-conteudo/conteudo-conteudo.service';
import { ConteudoConteudo } from '../../../../../../main/webapp/app/entities/conteudo-conteudo/conteudo-conteudo.model';
import { PaginaConteudoService } from '../../../../../../main/webapp/app/entities/pagina-conteudo';

describe('Component Tests', () => {

    describe('ConteudoConteudo Management Dialog Component', () => {
        let comp: ConteudoConteudoDialogComponent;
        let fixture: ComponentFixture<ConteudoConteudoDialogComponent>;
        let service: ConteudoConteudoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoConteudoTestModule],
                declarations: [ConteudoConteudoDialogComponent],
                providers: [
                    PaginaConteudoService,
                    ConteudoConteudoService
                ]
            })
            .overrideTemplate(ConteudoConteudoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConteudoConteudoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConteudoConteudoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ConteudoConteudo(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.conteudo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'conteudoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ConteudoConteudo();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.conteudo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'conteudoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
