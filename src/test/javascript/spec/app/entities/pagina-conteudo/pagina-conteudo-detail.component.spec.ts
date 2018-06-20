/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProjetoConteudoTestModule } from '../../../test.module';
import { PaginaConteudoDetailComponent } from '../../../../../../main/webapp/app/entities/pagina-conteudo/pagina-conteudo-detail.component';
import { PaginaConteudoService } from '../../../../../../main/webapp/app/entities/pagina-conteudo/pagina-conteudo.service';
import { PaginaConteudo } from '../../../../../../main/webapp/app/entities/pagina-conteudo/pagina-conteudo.model';

describe('Component Tests', () => {

    describe('PaginaConteudo Management Detail Component', () => {
        let comp: PaginaConteudoDetailComponent;
        let fixture: ComponentFixture<PaginaConteudoDetailComponent>;
        let service: PaginaConteudoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoConteudoTestModule],
                declarations: [PaginaConteudoDetailComponent],
                providers: [
                    PaginaConteudoService
                ]
            })
            .overrideTemplate(PaginaConteudoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaginaConteudoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaginaConteudoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PaginaConteudo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.pagina).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
