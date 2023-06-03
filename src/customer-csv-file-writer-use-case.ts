import Customer from "./Customer";
import { FileWriter } from "./FileWriter";

class CustomerCsvFileWriter{
      
       
       constructor(private readonly fileWriter:FileWriter){}
       
       
       public execute(fileName:string,customers:Customer[]){

              console.log( fileName.slice(0, fileName.lastIndexOf('.')))
          
              if(customers===null){
                 throw new Error("argument is null : `customers`");
              }
              
             let fileNumber = 0
              
              for(let i=0;i<customers.length;i++){
                    
                     if(i!=0 && i%10==0){
                         fileNumber++
                            
                            this
                            .fileWriter
                            .writeLine(`${fileName}${fileNumber?fileNumber:''}`,
                            this.formatAsCsvRow(customers[i]))
                      }

              }
              // customers
              //        .forEach(customer => 

                              
              //                      this
              //                      .fileWriter
              //                      .writeLine(fileName,this.formatAsCsvRow(customer))
              //               )
                                
       }

       private  formatAsCsvRow=(customer:Customer):string=>{
           return `${customer.name},${customer.contactNumber}`
       }

     
       

}


export default CustomerCsvFileWriter