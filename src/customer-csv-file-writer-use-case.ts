import Customer from "./Customer";
import { FileWriter } from "./FileWriter";

class CustomerCsvFileWriter{
      
       
       constructor(private readonly fileWriter:FileWriter){}
       
       
        public writeCustomers(fileName:string,customers:Customer[]){
            
           if(customers===null){
                 throw new Error("argument is null : `customers`");
              }
              
            customers
              .forEach(customer => 
                                   this.fileWriter
                                   .writeLine(fileName,this.formatAsCsvRow(customer))
                     )
                                
       }



       public writeCustomersBatched(fileName:string,customers:Customer[]){

              const NAME = fileName.slice(0, fileName.lastIndexOf('.'))
              const EXT = fileName.slice(fileName.lastIndexOf('.'))
              const BATCH_SIZE = 10

              let fileCount = 0

              for (let i = 0 ;i<customers.length;i+=BATCH_SIZE){

                     const nextFileName = `${NAME}${fileCount || ''}${EXT}`;
                     const nextCustomers = customers.slice(i, i + BATCH_SIZE);

                     this.writeCustomers(nextFileName,nextCustomers)

                     fileCount++
              }

       }


       private  formatAsCsvRow=(customer:Customer):string=>{
           return `${customer.name},${customer.contactNumber}`
       }

}

export default CustomerCsvFileWriter