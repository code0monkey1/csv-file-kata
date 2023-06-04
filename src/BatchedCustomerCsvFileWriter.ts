import Customer from './Customer';
import CustomerCsvFileWriter from './customer-csv-file-writer-use-case';
class BatchedCustomerCsvFileWriter{

       constructor(private readonly customerCsvFileWriter:CustomerCsvFileWriter){}
    
       public writeCustomers(fileName:string,customers:Customer[]){
              
              const extIndex=fileName.lastIndexOf('.')
              
              if(extIndex===-1)
                     throw new Error("File Extension Missing")
              
              const baseFileName = fileName.substring(0, extIndex)

              const ext = fileName.substring(extIndex)
            
              const BATCH_SIZE = 10

              let fileCount = 0

              for (let i = 0 ;i<customers.length;i+=BATCH_SIZE){

                     const nextFileName = `${baseFileName}${fileCount || ''}${ext}`;
                    
                     const nextCustomers = customers.slice(i, i + BATCH_SIZE);
                     
                     this.customerCsvFileWriter.writeCustomers(nextFileName,nextCustomers)

                     fileCount++
              }

       }

}

export default BatchedCustomerCsvFileWriter;