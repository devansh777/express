products = [];

module.exports = class Prduct{
    constructor(t){
        this.title = t;
    }

    save() {
        products.push(this);
    }

    static fetchAll(){
        return products;
    }
}