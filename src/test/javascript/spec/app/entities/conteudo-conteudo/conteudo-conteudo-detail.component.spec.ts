/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProjetoConteudoTestModule } from '../../../test.module';
import { ConteudoConteudoDetailComponent } from '../../../../../../main/webapp/app/entities/conteudo-conteudo/conteudo-conteudo-detail.component';
import { ConteudoConteudoService } from '../../../../../../main/webapp/app/entities/conteudo-conteudo/conteudo-conteudo.service';
import { ConteudoConteudo } from '../../../../../../main/webapp/app/entities/conteudo-conteudo/conteudo-conteudo.model';

describe('Component Tests', () => {

    describe('ConteudoConteudo Management Detail Component', () => {
        let comp: ConteudoConteudoDetailComponent;
        let fixture: ComponentFixture<ConteudoConteudoDetailComponent>;
        let service: ConteudoConteudoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoConteudoTestModule],
                declarations: [ConteudoConteudoDetailComponent],
                providers: [
                    ConteudoConteudoService
                ]
            })
            .overrideTemplate(ConteudoConteudoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConteudoConteudoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConteudoConteudoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ConteudoConteudo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.conteudo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
