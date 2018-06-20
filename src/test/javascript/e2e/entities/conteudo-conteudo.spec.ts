import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Conteudo e2e test', () => {

    let navBarPage: NavBarPage;
    let conteudoDialogPage: ConteudoDialogPage;
    let conteudoComponentsPage: ConteudoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Conteudos', () => {
        navBarPage.goToEntity('conteudo-conteudo');
        conteudoComponentsPage = new ConteudoComponentsPage();
        expect(conteudoComponentsPage.getTitle())
            .toMatch(/Conteudos/);

    });

    it('should load create Conteudo dialog', () => {
        conteudoComponentsPage.clickOnCreateButton();
        conteudoDialogPage = new ConteudoDialogPage();
        expect(conteudoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Conteudo/);
        conteudoDialogPage.close();
    });

    it('should create and save Conteudos', () => {
        conteudoComponentsPage.clickOnCreateButton();
        conteudoDialogPage.setOrdemInput('5');
        expect(conteudoDialogPage.getOrdemInput()).toMatch('5');
        conteudoDialogPage.setConteudoInput('conteudo');
        expect(conteudoDialogPage.getConteudoInput()).toMatch('conteudo');
        conteudoDialogPage.paginaSelectLastOption();
        conteudoDialogPage.save();
        expect(conteudoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ConteudoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-conteudo-conteudo div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ConteudoDialogPage {
    modalTitle = element(by.css('h4#myConteudoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    ordemInput = element(by.css('input#field_ordem'));
    conteudoInput = element(by.css('input#field_conteudo'));
    paginaSelect = element(by.css('select#field_pagina'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setOrdemInput = function(ordem) {
        this.ordemInput.sendKeys(ordem);
    };

    getOrdemInput = function() {
        return this.ordemInput.getAttribute('value');
    };

    setConteudoInput = function(conteudo) {
        this.conteudoInput.sendKeys(conteudo);
    };

    getConteudoInput = function() {
        return this.conteudoInput.getAttribute('value');
    };

    paginaSelectLastOption = function() {
        this.paginaSelect.all(by.tagName('option')).last().click();
    };

    paginaSelectOption = function(option) {
        this.paginaSelect.sendKeys(option);
    };

    getPaginaSelect = function() {
        return this.paginaSelect;
    };

    getPaginaSelectedOption = function() {
        return this.paginaSelect.element(by.css('option:checked')).getText();
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
