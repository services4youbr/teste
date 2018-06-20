import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SiteConteudoComponent } from './site-conteudo.component';
import { SiteConteudoDetailComponent } from './site-conteudo-detail.component';
import { SiteConteudoPopupComponent } from './site-conteudo-dialog.component';
import { SiteConteudoDeletePopupComponent } from './site-conteudo-delete-dialog.component';

@Injectable()
export class SiteConteudoResolvePagingParams implements Resolve<any> {

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

export const siteRoute: Routes = [
    {
        path: 'site-conteudo',
        component: SiteConteudoComponent,
        resolve: {
            'pagingParams': SiteConteudoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sites'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'site-conteudo/:id',
        component: SiteConteudoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sites'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sitePopupRoute: Routes = [
    {
        path: 'site-conteudo-new',
        component: SiteConteudoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sites'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'site-conteudo/:id/edit',
        component: SiteConteudoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sites'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'site-conteudo/:id/delete',
        component: SiteConteudoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sites'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
