const { assert } = require('console');
const utils = require('../utils/commonUtils');
class Header{
    constructor(page){
        this.page = page;
        this.utils =  new utils(this.page);
    }
    static createHeaderInstance(page) {
        return new Header(page);
      }
    async isHeaderPresent(){
       const header = await this.utils.isElementPresent('header header--middle-left page-width header--has-menu');
       assert.isTrue(header);
    }
    async isHeaderPresent(){

    }
}
module.exports = Header;