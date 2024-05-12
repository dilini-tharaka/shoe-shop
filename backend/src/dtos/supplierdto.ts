export default interface Supplierdto {
    name: string;
    nic: string;
    email: string;
    address: string;
    mobile: string;
    availableBrands: {
        brandName: string;
    }
    bankDetails: {
        accountHolder: string;
        bankName: string;
        accountNumber: string;
        branch: string;
    };
}