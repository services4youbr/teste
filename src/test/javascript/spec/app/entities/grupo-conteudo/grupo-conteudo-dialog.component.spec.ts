/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetoConteudoTestModule } from '../../../test.module';
import { GrupoConteudoDialogComponent } from '../../../../../../main/webapp/app/entities/grupo-conteudo/grupo-conteudo-dialog.component';
import { GrupoConteudoService } from '../../../../../../main/webapp/app/entities/grupo-conteudo/grupo-conteudo.service';
import { GrupoConteudo } from '../../../../../../main/webapp/app/entities/grupo-conteudo/grupo-conteudo.model';
import { SiteConteudoService } from '../../../../../../main/webapp/app/entities/site-conteudo';

describe('Component Tests', () => {

    describe('GrupoConteudo Management Dialog Component', () => {
        let comp: GrupoConteudoDialogComponent;
        let fixture: ComponentFixture<GrupoConteudoDialogComponent>;
        let service: GrupoConteudoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoConteudoTestModule],
                declarations: [GrupoConteudoDialogComponent],
                providers: [
                    SiteConteudoService,
                    GrupoConteudoService
                ]
            })
            .overrideTemplate(GrupoConteudoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GrupoConteudoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GrupoConteudoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GrupoConteudo(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.grupo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'grupoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GrupoConteudo();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.grupo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'grupoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
