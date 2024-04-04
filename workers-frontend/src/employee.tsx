class employee {

    userId!: number;
    code!: string;
    createdBy!: string;
    updatedBy!: string;
    roleId!: number;
    position!: positions;

    constructor() { }
}

export default employee

enum positions {
    secretary,
    cleaner,
    deliveryPerson,
    developer,
    tester,
    maneger,
    owner,
}