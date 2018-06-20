import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PaginaConteudo } from './pagina-conteudo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PaginaConteudo>;

@Injectable()
export class PaginaConteudoService {

    private resourceUrl =  SERVER_API_URL + 'api/paginas';

    constructor(private http: HttpClient) { }

    create(pagina: PaginaConteudo): Observable<EntityResponseType> {
        const copy = this.convert(pagina);
        return this.http.post<PaginaConteudo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pagina: PaginaConteudo): Observable<EntityResponseType> {
        const copy = this.convert(pagina);
        return this.http.put<PaginaConteudo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PaginaConteudo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PaginaConteudo[]>> {
        const options = createRequestOption(req);
        return this.http.get<PaginaConteudo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PaginaConteudo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PaginaConteudo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PaginaConteudo[]>): HttpResponse<PaginaConteudo[]> {
        const jsonResponse: PaginaConteudo[] = res.body;
        const body: PaginaConteudo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PaginaConteudo.
     */
    private convertItemFromServer(pagina: PaginaConteudo): PaginaConteudo {
        const copy: PaginaConteudo = Object.assign({}, pagina);
        return copy;
    }

    /**
     * Convert a PaginaConteudo to a JSON which can be sent to the server.
     */
    private convert(pagina: PaginaConteudo): PaginaConteudo {
        const copy: PaginaConteudo = Object.assign({}, pagina);
        return copy;
    }
}
