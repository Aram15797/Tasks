interface Product {
    operation(): string;
}

class ConcreteProductA implements Product {
    public operation(): string {
        return 'Result of ConcreteProductA';
    }
}

class ConcreteProductB implements Product {
    public operation(): string {
        return 'Result of ConcreteProductB';
    }
}

class Factory {
    public createProduct(type: string): Product {
        switch (type) {
            case 'A':
                return new ConcreteProductA();
            case 'B':
                return new ConcreteProductB();
            default:
                throw new Error('Unknown product type');
        }
    }
}

const factory = new Factory();
const productA = factory.createProduct('A');
const productB = factory.createProduct('B');

console.log(productA.operation());
console.log(productB.operation());