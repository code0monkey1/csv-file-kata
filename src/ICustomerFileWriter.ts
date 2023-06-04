import Customer from "./Customer";

interface ICustomerFileWriter{

   writeCustomers(fileName:string,customers:Customer[]):void

}