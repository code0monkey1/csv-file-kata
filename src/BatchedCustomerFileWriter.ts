import Customer from './Customer';
import ICustomerFileWriter from './ICustomerFileWriter';
import CustomerCsvFileWriter from './customer-csv-file-writer-use-case';
class BatchedCustomerCsvFileWriter implements ICustomerFileWriter{

       constructor(
        private readonly fileWriter:ICustomerFileWriter,
        private readonly batchSize:number){}
    
       public writeCustomers(fileName:string,customers:Customer[]){
                           
              if(customers===null)
                 throw new Error("argument is null : `customers`");

              
              const extIndex=fileName.lastIndexOf('.')
              
              if(extIndex===-1)
                     throw new Error("File Extension Missing")
              
              const baseFileName = fileName.substring(0, extIndex)

              const ext = fileName.substring(extIndex)
            

              let fileCount = 0
      
              for (let i = 0 ;i<customers.length;i+=this.batchSize){

                     const nextFileName = `${baseFileName}${fileCount || ''}${ext}`;
                    
                     const nextCustomers = customers.slice(i, i + this.batchSize);
                     
                     this.fileWriter.writeCustomers(nextFileName,nextCustomers)

                     fileCount++
              }

       }

}

export default BatchedCustomerCsvFileWriter;