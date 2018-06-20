import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { GrupoConteudo } from './grupo-conteudo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<GrupoConteudo>;

@Injectable()
export class GrupoConteudoService {

    private resourceUrl =  SERVER_API_URL + 'api/grupos';

    constructor(private http: HttpClient) { }

    create(grupo: GrupoConteudo): Observable<EntityResponseType> {
        const copy = this.convert(grupo);
        return this.http.post<GrupoConteudo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(grupo: GrupoConteudo): Observable<EntityResponseType> {
        const copy = this.convert(grupo);
        return this.http.put<GrupoConteudo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<GrupoConteudo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<GrupoConteudo[]>> {
        const options = createRequestOption(req);
        return this.http.get<GrupoConteudo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GrupoConteudo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: GrupoConteudo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<GrupoConteudo[]>): HttpResponse<GrupoConteudo[]> {
        const jsonResponse: GrupoConteudo[] = res.body;
        const body: GrupoConteudo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to GrupoConteudo.
     */
    private convertItemFromServer(grupo: GrupoConteudo): GrupoConteudo {
        const copy: GrupoConteudo = Object.assign({}, grupo);
        return copy;
    }

    /**
     * Convert a GrupoConteudo to a JSON which can be sent to the server.
     */
    private convert(grupo: GrupoConteudo): GrupoConteudo {
        const copy: GrupoConteudo = Object.assign({}, grupo);
        return copy;
    }
}
