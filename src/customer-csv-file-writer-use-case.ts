import Customer from "./Customer";
import { FileWriter } from "./FileWriter";

class CustomerCsvFileWriter{
         
       constructor(private readonly fileWriter:FileWriter){}
          
       public writeCustomers(fileName:string,customers:Customer[]){
            
           if(customers===null)
                 throw new Error("argument is null : `customers`");
                         
              customers
                     .forEach(customer => 
                                   this
                                   .fileWriter
                                   .writeLine(fileName,this.formatAsCsvRow(customer))
                            )
                                
       }

       public writeCustomersBatched(fileName:string,customers:Customer[]){
              
              const extIndex=fileName.lastIndexOf('.')
              
              const baseFileName = fileName.substring(0, extIndex)

               if(!baseFileName)
                     throw new Error("File Extension Missing")
              
              const ext = fileName.substring(extIndex)
            
              const BATCH_SIZE = 10

              let fileCount = 0

              for (let i = 0 ;i<customers.length;i+=BATCH_SIZE){

                     const nextFileName = `${baseFileName}${fileCount || ''}${ext}`;
                    
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