import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Pagina e2e test', () => {

    let navBarPage: NavBarPage;
    let paginaDialogPage: PaginaDialogPage;
    let paginaComponentsPage: PaginaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Paginas', () => {
        navBarPage.goToEntity('pagina-conteudo');
        paginaComponentsPage = new PaginaComponentsPage();
        expect(paginaComponentsPage.getTitle())
            .toMatch(/Paginas/);

    });

    it('should load create Pagina dialog', () => {
        paginaComponentsPage.clickOnCreateButton();
        paginaDialogPage = new PaginaDialogPage();
        expect(paginaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Pagina/);
        paginaDialogPage.close();
    });

    it('should create and save Paginas', () => {
        paginaComponentsPage.clickOnCreateButton();
        paginaDialogPage.setTituloInput('titulo');
        expect(paginaDialogPage.getTituloInput()).toMatch('titulo');
        paginaDialogPage.setNomeInput('nome');
        expect(paginaDialogPage.getNomeInput()).toMatch('nome');
        paginaDialogPage.grupoSelectLastOption();
        paginaDialogPage.save();
        expect(paginaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PaginaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pagina-conteudo div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PaginaDialogPage {
    modalTitle = element(by.css('h4#myPaginaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    tituloInput = element(by.css('input#field_titulo'));
    nomeInput = element(by.css('input#field_nome'));
    grupoSelect = element(by.css('select#field_grupo'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setTituloInput = function(titulo) {
        this.tituloInput.sendKeys(titulo);
    };

    getTituloInput = function() {
        return this.tituloInput.getAttribute('value');
    };

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    };

    grupoSelectLastOption = function() {
        this.grupoSelect.all(by.tagName('option')).last().click();
    };

    grupoSelectOption = function(option) {
        this.grupoSelect.sendKeys(option);
    };

    getGrupoSelect = function() {
        return this.grupoSelect;
    };

    getGrupoSelectedOption = function() {
        return this.grupoSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
