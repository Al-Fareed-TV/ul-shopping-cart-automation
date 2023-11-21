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
        return this.page.locator(`.js.product-form__input > label`)
    }
    get sizeLocator() {
        return this.page.locator('.js.product-form__input > legend')
    }
    get sizeValue1() {
        return this.page.locator('.js.product-form__input').nth(1).locator('>label')
    }
    async isFilteredAccordingToSizeOrNot(productSizeArray) {
        const priceCount = await this.priceLocator.count();
        for (let i = 0; i < priceCount; i++) {
            await this.priceLocator.nth(i).click();
            let temp = 0;
            if ((await this.sizeLocator.first().textContent()).trim() === "Size") {
                const sizeValueCount = await this.sizeValue.count();
                for (let j = 0; j < sizeValueCount; j++) {
                    const productSizeText = (await this.sizeValue.nth(j).textContent()).trim();
                    if (!productSizeArray.includes(productSizeText) && !(await this.sizeValue.nth(j).isChecked())) {
                        temp = 1;
                    }
                    else {
                        temp = 0;
                        break;
                    }
                }
            }
    else {
        const size = await this.page.locator(this.selectors.productSizeSelector).nth(1).locator(this.selectors.sizeLabelSelector).count()
        for (let i = 0; i < size; i++) {
            const productSizeText = (await this.page.locator(this.selectors.productSizeSelector).nth(1).locator(this.selectors.sizeLabelSelector).nth(i).textContent()).trim()
            if (!productSizeArray.includes(productSizeText) && !(await this.sizeValue1.nth(i).isChecked())) {
                temp = 1;
            }
            else {
                temp = 0;
                break;
            }
        }
    }
            if (temp !== 0) {
                this.logBrandMismatchError();
            }
            await this.page.goBack();
        }
    }

    logBrandMismatchError() {
        const errorMessage = `Error: Product size does not match any of the specified sizes.`;
        console.error(errorMessage);
    }

    get productTypeCount(){
        return this.page.locator('.active-facets.active-facets-desktop > facet-remove > a > span')
    }
    async isFilteredAccordingToProductTypeOrNot(productTypeArray){
        const typeCount = await this.productTypeCount.count()
        for (let i = 0; i < typeCount - 1; i++) {
            const productType = (await this.productTypeCount.nth(i).first().textContent()).trim();
            console.log(productType)

            if (!(productTypeArray.includes(productType))) {
                this.logTypeNotFoundError(productType);
            }
        }
    }

    async logTypeNotFoundError(productType) {
        const errorMessage = `Error: Product type (${productType}) does not match any of the specified types.`;
        console.error(errorMessage);
    }

}

module.exports = { SecurePageForStorePage };
