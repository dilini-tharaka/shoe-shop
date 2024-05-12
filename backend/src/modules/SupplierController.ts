export default class SupplierDetails {
  name: string;
  nic: string;
  email: string;
  address: string;
  mobile: string;
  availableBrands: [brandName: string ];
  bankDetails: {
    accountHolder: string;
    bankName: string;
    accountNumber: string;
    branch: string;
  };
  constructor(
    name: string,
    nic: string,
    email: string,
    address: string,
    mobile: string,
    availableBrands: [brandName: string ],
    bankDetails: {
      accountHolder: string;
      bankName: string;
      accountNumber: string;
      branch: string;
    }
  ) {
    this.name = name;
    this.nic = nic;
    this.email = email;
    this.address = address;
    this.mobile = mobile;
    this.availableBrands = availableBrands;
    this.bankDetails = bankDetails;
  }
}


// json sample
// {"name": "John Doe",
//     "nic": "123456789V",
//     "email": "john@gmail.com",
//     "address": "123, Main Street, Colombo 01",
//     "mobile": "0771234567",
//     "availableBrands": ["adidAS","puma","reebok"],
//     "bankDetails":{
//      "brandName": "Brand 1" ,  "accountHolder": "John Doe",  "accountNumber": "123456789", "branch": "Colombo"}
// }