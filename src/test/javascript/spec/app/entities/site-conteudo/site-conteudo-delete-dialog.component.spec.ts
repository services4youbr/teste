/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetoConteudoTestModule } from '../../../test.module';
import { SiteConteudoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/site-conteudo/site-conteudo-delete-dialog.component';
import { SiteConteudoService } from '../../../../../../main/webapp/app/entities/site-conteudo/site-conteudo.service';

describe('Component Tests', () => {

    describe('SiteConteudo Management Delete Component', () => {
        let comp: SiteConteudoDeleteDialogComponent;
        let fixture: ComponentFixture<SiteConteudoDeleteDialogComponent>;
        let service: SiteConteudoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoConteudoTestModule],
                declarations: [SiteConteudoDeleteDialogComponent],
                providers: [
                    SiteConteudoService
                ]
            })
            .overrideTemplate(SiteConteudoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SiteConteudoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteConteudoService);
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
