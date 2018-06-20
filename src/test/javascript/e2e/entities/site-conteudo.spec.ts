import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Site e2e test', () => {

    let navBarPage: NavBarPage;
    let siteDialogPage: SiteDialogPage;
    let siteComponentsPage: SiteComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Sites', () => {
        navBarPage.goToEntity('site-conteudo');
        siteComponentsPage = new SiteComponentsPage();
        expect(siteComponentsPage.getTitle())
            .toMatch(/Sites/);

    });

    it('should load create Site dialog', () => {
        siteComponentsPage.clickOnCreateButton();
        siteDialogPage = new SiteDialogPage();
        expect(siteDialogPage.getModalTitle())
            .toMatch(/Create or edit a Site/);
        siteDialogPage.close();
    });

    it('should create and save Sites', () => {
        siteComponentsPage.clickOnCreateButton();
        siteDialogPage.setNomeInput('nome');
        expect(siteDialogPage.getNomeInput()).toMatch('nome');
        siteDialogPage.setUrlInput('url');
        expect(siteDialogPage.getUrlInput()).toMatch('url');
        siteDialogPage.save();
        expect(siteDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SiteComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-site-conteudo div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SiteDialogPage {
    modalTitle = element(by.css('h4#mySiteLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    urlInput = element(by.css('input#field_url'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    };

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    };

    setUrlInput = function(url) {
        this.urlInput.sendKeys(url);
    };

    getUrlInput = function() {
        return this.urlInput.getAttribute('value');
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
