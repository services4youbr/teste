import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PaginaConteudoComponent } from './pagina-conteudo.component';
import { PaginaConteudoDetailComponent } from './pagina-conteudo-detail.component';
import { PaginaConteudoPopupComponent } from './pagina-conteudo-dialog.component';
import { PaginaConteudoDeletePopupComponent } from './pagina-conteudo-delete-dialog.component';

@Injectable()
export class PaginaConteudoResolvePagingParams implements Resolve<any> {

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

export const paginaRoute: Routes = [
    {
        path: 'pagina-conteudo',
        component: PaginaConteudoComponent,
        resolve: {
            'pagingParams': PaginaConteudoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Paginas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pagina-conteudo/:id',
        component: PaginaConteudoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Paginas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paginaPopupRoute: Routes = [
    {
        path: 'pagina-conteudo-new',
        component: PaginaConteudoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Paginas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pagina-conteudo/:id/edit',
        component: PaginaConteudoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Paginas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pagina-conteudo/:id/delete',
        component: PaginaConteudoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Paginas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
