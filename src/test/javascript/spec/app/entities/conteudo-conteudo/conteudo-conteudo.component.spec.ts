/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetoConteudoTestModule } from '../../../test.module';
import { ConteudoConteudoComponent } from '../../../../../../main/webapp/app/entities/conteudo-conteudo/conteudo-conteudo.component';
import { ConteudoConteudoService } from '../../../../../../main/webapp/app/entities/conteudo-conteudo/conteudo-conteudo.service';
import { ConteudoConteudo } from '../../../../../../main/webapp/app/entities/conteudo-conteudo/conteudo-conteudo.model';

describe('Component Tests', () => {

    describe('ConteudoConteudo Management Component', () => {
        let comp: ConteudoConteudoComponent;
        let fixture: ComponentFixture<ConteudoConteudoComponent>;
        let service: ConteudoConteudoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoConteudoTestModule],
                declarations: [ConteudoConteudoComponent],
                providers: [
                    ConteudoConteudoService
                ]
            })
            .overrideTemplate(ConteudoConteudoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConteudoConteudoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConteudoConteudoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ConteudoConteudo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.conteudos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
