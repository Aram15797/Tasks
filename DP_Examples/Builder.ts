class Product {
    private parts: string[] = [];

    public addPart(part: string): void {
        this.parts.push(part);
    }

    public listParts(): void {
        console.log(`Product parts: ${this.parts.join(', ')}`);
    }
}

class Builder {
    private product!: Product;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.product = new Product();
    }

    public buildPartA(): this {
        this.product.addPart('Part A');
        return this;
    }

    public buildPartB(): this {
        this.product.addPart('Part B');
        return this;
    }

    public buildPartC(): this {
        this.product.addPart('Part C');
        return this;
    }

    public getProduct(): Product {
        const result = this.product;
        this.reset();
        return result;
    }
}

const builder = new Builder();
const product = builder.buildPartA().buildPartB().buildPartC().getProduct();
product.listParts();
