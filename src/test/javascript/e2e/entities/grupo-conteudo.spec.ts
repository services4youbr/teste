import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Grupo e2e test', () => {

    let navBarPage: NavBarPage;
    let grupoDialogPage: GrupoDialogPage;
    let grupoComponentsPage: GrupoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Grupos', () => {
        navBarPage.goToEntity('grupo-conteudo');
        grupoComponentsPage = new GrupoComponentsPage();
        expect(grupoComponentsPage.getTitle())
            .toMatch(/Grupos/);

    });

    it('should load create Grupo dialog', () => {
        grupoComponentsPage.clickOnCreateButton();
        grupoDialogPage = new GrupoDialogPage();
        expect(grupoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Grupo/);
        grupoDialogPage.close();
    });

    it('should create and save Grupos', () => {
        grupoComponentsPage.clickOnCreateButton();
        grupoDialogPage.setNomeInput('nome');
        expect(grupoDialogPage.getNomeInput()).toMatch('nome');
        grupoDialogPage.siteSelectLastOption();
        grupoDialogPage.save();
        expect(grupoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class GrupoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-grupo-conteudo div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class GrupoDialogPage {
    modalTitle = element(by.css('h4#myGrupoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    siteSelect = element(by.css('select#field_site'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    };

    siteSelectLastOption = function() {
        this.siteSelect.all(by.tagName('option')).last().click();
    };

    siteSelectOption = function(option) {
        this.siteSelect.sendKeys(option);
    };

    getSiteSelect = function() {
        return this.siteSelect;
    };

    getSiteSelectedOption = function() {
        return this.siteSelect.element(by.css('option:checked')).getText();
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
