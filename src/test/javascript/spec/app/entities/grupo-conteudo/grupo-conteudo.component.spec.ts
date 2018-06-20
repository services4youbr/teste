/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetoConteudoTestModule } from '../../../test.module';
import { GrupoConteudoComponent } from '../../../../../../main/webapp/app/entities/grupo-conteudo/grupo-conteudo.component';
import { GrupoConteudoService } from '../../../../../../main/webapp/app/entities/grupo-conteudo/grupo-conteudo.service';
import { GrupoConteudo } from '../../../../../../main/webapp/app/entities/grupo-conteudo/grupo-conteudo.model';

describe('Component Tests', () => {

    describe('GrupoConteudo Management Component', () => {
        let comp: GrupoConteudoComponent;
        let fixture: ComponentFixture<GrupoConteudoComponent>;
        let service: GrupoConteudoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoConteudoTestModule],
                declarations: [GrupoConteudoComponent],
                providers: [
                    GrupoConteudoService
                ]
            })
            .overrideTemplate(GrupoConteudoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GrupoConteudoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GrupoConteudoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new GrupoConteudo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.grupos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
