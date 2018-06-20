import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ConteudoConteudoComponent } from './conteudo-conteudo.component';
import { ConteudoConteudoDetailComponent } from './conteudo-conteudo-detail.component';
import { ConteudoConteudoPopupComponent } from './conteudo-conteudo-dialog.component';
import { ConteudoConteudoDeletePopupComponent } from './conteudo-conteudo-delete-dialog.component';

@Injectable()
export class ConteudoConteudoResolvePagingParams implements Resolve<any> {

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

export const conteudoRoute: Routes = [
    {
        path: 'conteudo-conteudo',
        component: ConteudoConteudoComponent,
        resolve: {
            'pagingParams': ConteudoConteudoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conteudos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'conteudo-conteudo/:id',
        component: ConteudoConteudoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conteudos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const conteudoPopupRoute: Routes = [
    {
        path: 'conteudo-conteudo-new',
        component: ConteudoConteudoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conteudos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'conteudo-conteudo/:id/edit',
        component: ConteudoConteudoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conteudos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'conteudo-conteudo/:id/delete',
        component: ConteudoConteudoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Conteudos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
