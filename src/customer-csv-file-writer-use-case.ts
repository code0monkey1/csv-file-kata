import Customer from "./Customer";
import { FileWriter } from "./FileWriter";

class CustomerCsvFileWriter{
      
       
       constructor(private readonly fileWriter:FileWriter){}
       
       
       public execute(fileName:string,customers:Customer[]){

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


       private  formatAsCsvRow=(customer:Customer):string=>{
           return `${customer.name},${customer.contactNumber}`
       }

}

export default CustomerCsvFileWriter