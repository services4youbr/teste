import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SiteConteudo } from './site-conteudo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SiteConteudo>;

@Injectable()
export class SiteConteudoService {

    private resourceUrl =  SERVER_API_URL + 'api/sites';

    constructor(private http: HttpClient) { }

    create(site: SiteConteudo): Observable<EntityResponseType> {
        const copy = this.convert(site);
        return this.http.post<SiteConteudo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(site: SiteConteudo): Observable<EntityResponseType> {
        const copy = this.convert(site);
        return this.http.put<SiteConteudo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SiteConteudo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SiteConteudo[]>> {
        const options = createRequestOption(req);
        return this.http.get<SiteConteudo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SiteConteudo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SiteConteudo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SiteConteudo[]>): HttpResponse<SiteConteudo[]> {
        const jsonResponse: SiteConteudo[] = res.body;
        const body: SiteConteudo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SiteConteudo.
     */
    private convertItemFromServer(site: SiteConteudo): SiteConteudo {
        const copy: SiteConteudo = Object.assign({}, site);
        return copy;
    }

    /**
     * Convert a SiteConteudo to a JSON which can be sent to the server.
     */
    private convert(site: SiteConteudo): SiteConteudo {
        const copy: SiteConteudo = Object.assign({}, site);
        return copy;
    }
}
