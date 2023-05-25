import Customer from "./Customer";
import { FileWriter } from "./FileWriter";

class CustomerCsvFileWriter{

       constructor(private readonly fileWriter:FileWriter){}
      

       public execute(fileName:string,customers:Customer[]){

           customers
                  .forEach(customer=> 
                                this.fileWriter
                                .writeLine(fileName,customer.toString() ))
       }

}


export default CustomerCsvFileWriter