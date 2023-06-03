import Customer from "./Customer";
import { FileWriter } from "./FileWriter";

class CustomerCsvFileWriter{

       constructor(private readonly fileWriter:FileWriter){}
      

       public execute(fileName:string,customers:Customer[]){
          
              if(customers===null){
                 throw new Error("customer is null");
              }

           customers
                  .forEach(customer=> 
                                this
                                .fileWriter
                                .writeLine(fileName,customer.toString()))
                                
       }
       

}


export default CustomerCsvFileWriter