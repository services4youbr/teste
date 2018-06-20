import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GrupoConteudoComponent } from './grupo-conteudo.component';
import { GrupoConteudoDetailComponent } from './grupo-conteudo-detail.component';
import { GrupoConteudoPopupComponent } from './grupo-conteudo-dialog.component';
import { GrupoConteudoDeletePopupComponent } from './grupo-conteudo-delete-dialog.component';

@Injectable()
export class GrupoConteudoResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const grupoRoute: Routes = [
    {
        path: 'grupo-conteudo',
        component: GrupoConteudoComponent,
        resolve: {
            'pagingParams': GrupoConteudoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Grupos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'grupo-conteudo/:id',
        component: GrupoConteudoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Grupos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const grupoPopupRoute: Routes = [
    {
        path: 'grupo-conteudo-new',
        component: GrupoConteudoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Grupos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'grupo-conteudo/:id/edit',
        component: GrupoConteudoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Grupos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'grupo-conteudo/:id/delete',
        component: GrupoConteudoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Grupos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
