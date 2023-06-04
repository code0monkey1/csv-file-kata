import Customer from "../src/Customer"
import { FileWriter } from "../src/FileWriter"
import FileWriterHelper from "./FileWriterTestHelper"

 function createCustomers(numberOfCustomers:number){
        const customers=[]

        for(let i=0;i<numberOfCustomers;i++){
            customers.push(createCustomer((i).toString(),(i).toString()))
        }

        return customers
   }

     // to remove the constructor details 
   function createCustomer(name:string,contactNumber:string):Customer{
     return  new Customer(name,contactNumber)
   }

  function assertCustomerWasWrittenToFile(fileWriter:FileWriter,fileName:string,customer:Customer){
         expect(fileWriter.writeLine)
                    .toHaveBeenCalledWith(fileName,FileWriterHelper.formatAsCsvRow(customer))
   }

   function assertCustomersWereWrittenToFile(fileWriter:FileWriter,fileName:string,customers:Customer[]){

         customers.map( customer => assertCustomerWasWrittenToFile(fileWriter,fileName,customer))
        
   }

export default {
  createCustomers,
  createCustomer,
  assertCustomerWasWrittenToFile,
  assertCustomersWereWrittenToFile
}
