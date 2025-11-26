class OldSystem {
    public specificRequest(): string {
        return 'Specific request from old system';
    }
}

interface NewSystem {
    request(): string;
}

class Adapter implements NewSystem {
    private oldSystem: OldSystem;

    constructor(oldSystem: OldSystem) {
        this.oldSystem = oldSystem;
    }

    public request(): string {
        const result = this.oldSystem.specificRequest();
        return `Adapter: ${result}`;
    }
}

const oldSystem = new OldSystem();
const adapter = new Adapter(oldSystem);

console.log(adapter.request());