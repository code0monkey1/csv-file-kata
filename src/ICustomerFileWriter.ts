import Customer from "./Customer";

export default interface ICustomerFileWriter{

   writeCustomers(fileName:string,customers:Customer[]):void

}