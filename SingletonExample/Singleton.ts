class Singleton {
    private static instance: Singleton;

    private constructor() {}

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    public hello() {
        console.log("Hello from singleton!");
    }
}

// example
const a = Singleton.getInstance();
const b = Singleton.getInstance();

console.log(a === b); 
