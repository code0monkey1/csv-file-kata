import Customer from "./Customer";
import { FileWriter } from "./FileWriter";

class CustomerCsvFileWriter{

       constructor(private readonly fileWriter:FileWriter){}
      

       public execute(fileName:string,customers:Customer[]){
          
              if(customers===null){
                 throw new Error("argument is null : `customers`");
              }

           customers
                  .forEach(customer=> 
                                this
                                .fileWriter
                                .writeLine(fileName,this.formatAsCsvRow(customer)))
                                
       }

       private formatAsCsvRow=(customer:Customer):string=>{
           return `${customer.name},${customer.contactNumber}`
       }
       

}


export default CustomerCsvFileWriter