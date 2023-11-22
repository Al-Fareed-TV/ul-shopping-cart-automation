const { createDiffieHellmanGroup } = require("crypto");

class SecurePageForStorePage {
    constructor(page, testData) {
        this.page = page;
        this.testData = testData;
        this.selectors = {
            onSalePrice: '.price--on-sale .price-item--last',
            regularPrice: '.price__regular .price-item--regular',
            onSale: '.price--on-sale',
            productSizeSelector: '.js.product-form__input',
            sizeLabelSelector: '>label'
        };
    }

    static createInstance(page, testData) {
        return new SecurePageForStorePage(page, testData);
    }

    get priceLocator() {
        return this.page.locator('.full-unstyled-link');
    }

    get brandNameLocator() {
        return this.page.locator('.caption-with-letter-spacing');
    }

    get eachProductIndividually() {
        return this.page.locator('.product-grid li');
    }

    async isFilteredAccordingToBrandNameOrNot(brand) {

        for (let i = 0; i < await this.priceLocator.count(); i++) {
            await this.priceLocator.nth(i).click();
            const brandName = await this.brandNameLocator.textContent();

            if (!this.brandMatches(brand, brandName)) {
                this.logBrandMismatchError(brandName);
            }

            await this.page.goBack();
        }
    }

    brandMatches(brandArray, brandName) {
        return brandArray.includes(brandName);
    }

    logBrandMismatchError(brandName) {
        const errorMessage = `Error: Product brand (${brandName}) does not match any of the specified brands.`;
        console.error(errorMessage);
    }

    async isFilteredAccordingToPriceRangeOrNot() {

        for (let i = 0; i < await this.eachProductIndividually.count(); i++) {
            const product = this.eachProductIndividually.nth(i);
            const priceLocator = await this.getPriceLocator(product);

            const productPrice = await this.getProductPrice(product, priceLocator);

            if (!this.isPriceInRange(productPrice, this.testData.priceFrom, this.testData.priceTo)) {
                this.logPriceOutOfRangeError(productPrice);
            }
        }
    }

    async getPriceLocator(product) {
        return (await product.locator(this.selectors.onSale).isVisible()) ? this.selectors.onSalePrice : this.selectors.regularPrice;
    }

    async getProductPrice(product, priceLocator) {
        const priceText = await product.locator(priceLocator).first().textContent();
        return +priceText.trim().substring(4);
    }

    isPriceInRange(productPrice, priceFrom, priceTo) {
        return priceFrom < productPrice && productPrice < priceTo;
    }

    logPriceOutOfRangeError(productPrice) {
        const message = `This price(${productPrice}) is not in between ${this.testData.priceFrom} to ${this.testData.priceTo}`;
        console.error(message);
    }
    
    get sizeValue() {
        return this.page.locator('.js.product-form__input > label');
    }

    get sizeLocator() {
        return this.page.locator('.js.product-form__input > legend');
    }

    get sizeValue1() {
        return this.page.locator('.js.product-form__input').nth(1).locator('>label');
    }

    async isFilteredAccordingToSizeOrNot(productSizeArray) {
        const priceCount = await this.priceLocator.count();
        for (let i = 0; i < priceCount; i++) {
            await this.priceLocator.nth(i).click();
            let temp = 0;

            if ((await this.sizeLocator.first().textContent()).trim() === "Size") {
                temp = await this.checkProductSizes(productSizeArray, this.sizeValue);
            } else {
                temp = await this.checkProductSizes(productSizeArray, this.sizeValue1);
            }

            if (temp !== 0) {
                this.logBrandMismatchError();
            }

            await this.page.goBack();
        }
    }

    async checkProductSizes(productSizeArray, sizeValueLocator) {
        let temp = 0;
        const sizeValueCount = await sizeValueLocator.count();

        for (let j = 0; j < sizeValueCount; j++) {
            const productSizeText = (await sizeValueLocator.nth(j).textContent()).trim();

            if (!productSizeArray.includes(productSizeText) && !(await sizeValueLocator.nth(j).isChecked())) {
                temp = 1;
            } else {
                temp = 0;
                break;
            }
        }

        return temp;
    }

    logBrandMismatchError() {
        const errorMessage = `Error: Product size does not match any of the specified sizes.`;
        console.error(errorMessage);
    }

    get productTypeCount() {
        return this.page.locator('.active-facets.active-facets-desktop > facet-remove > a > span');
    }

    get productTypeText() {
        return this.page.locator('.active-facets__button-inner.button.button--tertiary');
    }

    async isFilteredAccordingToProductTypeOrNot(productTypeArray) {
        const productTypeCount = await this.getProductTypeCount();

        for (let i = 0; i < productTypeCount - 1; i++) {
            const productType = await this.getProductTypeText(i);
            const type = this.extractProductType(productType);

            if (!productTypeArray.includes(type)) {
                this.logTypeNotFoundError(productType);
            }
        }
    }

    async getProductTypeCount() {
        return (await this.productTypeCount.count()) - 1;
    }

    async getProductTypeText(index) {
        const productType = await this.productTypeText.nth(index).first().textContent();
        return productType.trim();
    }

    extractProductType(productType) {
        const split = productType.split('\n');
        return split[0].trim();
    }

    logTypeNotFoundError(productType) {
        const errorMessage = `Error: Product type '${productType}' not found in the specified types.`;
        console.error(errorMessage);
    }
}

module.exports = { SecurePageForStorePage };
