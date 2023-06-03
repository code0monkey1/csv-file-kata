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
              
             let fileNumber = 0
              
              for(let i=0;i<customers.length;i++){
                    
                     if(i!=0 && i%10==0){
                            fileNumber++
                      }
                         
                            this
                            .fileWriter
                            .writeLine(`${NAME}${fileNumber||''}${EXT}`,
                                   this.formatAsCsvRow(customers[i]))

              }
                                
       }

        public _writeCustomers(fileName:string,customers:Customer[]){

        
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
                       

                     this._writeCustomers(`${NAME}${fileCount||''}${EXT}`,customers.slice(i,i+BATCH_SIZE))

                     fileCount++
              }

              this.writeCustomers(fileName,customers)
       }


       private  formatAsCsvRow=(customer:Customer):string=>{
           return `${customer.name},${customer.contactNumber}`
       }

}

export default CustomerCsvFileWriter