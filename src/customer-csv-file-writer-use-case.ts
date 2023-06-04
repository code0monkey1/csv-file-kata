import Customer from "./Customer";
import { FileWriter } from "./FileWriter";
import ICustomerFileWriter from "./ICustomerFileWriter";

class CustomerCsvFileWriter implements ICustomerFileWriter{
         
       constructor(private readonly fileWriter:FileWriter){}
          
       public writeCustomers(fileName:string,customers:Customer[]){
                         
              customers
                     .forEach(customer => 
                                   this
                                   .fileWriter
                                   .writeLine(fileName,this.formatAsCsvRow(customer))
                            )
                                
       }

       private  formatAsCsvRow=(customer:Customer):string=>{
           return `${customer.name},${customer.contactNumber}`
       }

}

export default CustomerCsvFileWriter