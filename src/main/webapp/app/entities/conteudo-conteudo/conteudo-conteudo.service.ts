import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ConteudoConteudo } from './conteudo-conteudo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ConteudoConteudo>;

@Injectable()
export class ConteudoConteudoService {

    private resourceUrl =  SERVER_API_URL + 'api/conteudos';

    constructor(private http: HttpClient) { }

    create(conteudo: ConteudoConteudo): Observable<EntityResponseType> {
        const copy = this.convert(conteudo);
        return this.http.post<ConteudoConteudo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(conteudo: ConteudoConteudo): Observable<EntityResponseType> {
        const copy = this.convert(conteudo);
        return this.http.put<ConteudoConteudo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ConteudoConteudo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ConteudoConteudo[]>> {
        const options = createRequestOption(req);
        return this.http.get<ConteudoConteudo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ConteudoConteudo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ConteudoConteudo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ConteudoConteudo[]>): HttpResponse<ConteudoConteudo[]> {
        const jsonResponse: ConteudoConteudo[] = res.body;
        const body: ConteudoConteudo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ConteudoConteudo.
     */
    private convertItemFromServer(conteudo: ConteudoConteudo): ConteudoConteudo {
        const copy: ConteudoConteudo = Object.assign({}, conteudo);
        return copy;
    }

    /**
     * Convert a ConteudoConteudo to a JSON which can be sent to the server.
     */
    private convert(conteudo: ConteudoConteudo): ConteudoConteudo {
        const copy: ConteudoConteudo = Object.assign({}, conteudo);
        return copy;
    }
}
