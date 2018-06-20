/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetoConteudoTestModule } from '../../../test.module';
import { PaginaConteudoComponent } from '../../../../../../main/webapp/app/entities/pagina-conteudo/pagina-conteudo.component';
import { PaginaConteudoService } from '../../../../../../main/webapp/app/entities/pagina-conteudo/pagina-conteudo.service';
import { PaginaConteudo } from '../../../../../../main/webapp/app/entities/pagina-conteudo/pagina-conteudo.model';

describe('Component Tests', () => {

    describe('PaginaConteudo Management Component', () => {
        let comp: PaginaConteudoComponent;
        let fixture: ComponentFixture<PaginaConteudoComponent>;
        let service: PaginaConteudoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoConteudoTestModule],
                declarations: [PaginaConteudoComponent],
                providers: [
                    PaginaConteudoService
                ]
            })
            .overrideTemplate(PaginaConteudoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaginaConteudoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaginaConteudoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PaginaConteudo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.paginas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
