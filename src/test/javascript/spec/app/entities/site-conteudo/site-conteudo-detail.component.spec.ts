/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProjetoConteudoTestModule } from '../../../test.module';
import { SiteConteudoDetailComponent } from '../../../../../../main/webapp/app/entities/site-conteudo/site-conteudo-detail.component';
import { SiteConteudoService } from '../../../../../../main/webapp/app/entities/site-conteudo/site-conteudo.service';
import { SiteConteudo } from '../../../../../../main/webapp/app/entities/site-conteudo/site-conteudo.model';

describe('Component Tests', () => {

    describe('SiteConteudo Management Detail Component', () => {
        let comp: SiteConteudoDetailComponent;
        let fixture: ComponentFixture<SiteConteudoDetailComponent>;
        let service: SiteConteudoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoConteudoTestModule],
                declarations: [SiteConteudoDetailComponent],
                providers: [
                    SiteConteudoService
                ]
            })
            .overrideTemplate(SiteConteudoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SiteConteudoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteConteudoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SiteConteudo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.site).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
