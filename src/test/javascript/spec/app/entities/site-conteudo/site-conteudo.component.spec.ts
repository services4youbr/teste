/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetoConteudoTestModule } from '../../../test.module';
import { SiteConteudoComponent } from '../../../../../../main/webapp/app/entities/site-conteudo/site-conteudo.component';
import { SiteConteudoService } from '../../../../../../main/webapp/app/entities/site-conteudo/site-conteudo.service';
import { SiteConteudo } from '../../../../../../main/webapp/app/entities/site-conteudo/site-conteudo.model';

describe('Component Tests', () => {

    describe('SiteConteudo Management Component', () => {
        let comp: SiteConteudoComponent;
        let fixture: ComponentFixture<SiteConteudoComponent>;
        let service: SiteConteudoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoConteudoTestModule],
                declarations: [SiteConteudoComponent],
                providers: [
                    SiteConteudoService
                ]
            })
            .overrideTemplate(SiteConteudoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SiteConteudoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteConteudoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SiteConteudo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sites[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
