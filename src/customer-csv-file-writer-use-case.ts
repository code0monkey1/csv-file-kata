import Customer from "./Customer";
import { FileWriter } from "./FileWriter";

class CustomerCsvFileWriter{
      
       
       constructor(private readonly fileWriter:FileWriter){}
       
       
       public writeCustomers(fileName:string,customers:Customer[]){

              const NAME = fileName.slice(0, fileName.lastIndexOf('.'))
              const EXT = fileName.slice(fileName.lastIndexOf('.'))
              
              if(customers===null){
                 throw new Error("argument is null : `customers`");
              }
              
              customers.forEach(customer => 
                                     this
                                     .fileWriter
                                     .writeLine(fileName,this.formatAsCsvRow(customer))
                             )
                                   
       }

       public writeCustomersBatched(fileName:string,customers:Customer[]){
              
               if(customers.length>10){
                 this.writeCustomers("customers1.csv",customers)
               }
               else{
                     this.writeCustomers("customers.csv",customers)
               }
       }


       private  formatAsCsvRow=(customer:Customer):string=>{
           return `${customer.name},${customer.contactNumber}`
       }

}

export default CustomerCsvFileWriter