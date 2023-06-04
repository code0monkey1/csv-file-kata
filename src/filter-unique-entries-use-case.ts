
import FileWriterHelper from '../tests/FileWriterHelper';
import BatchedCustomerCsvFileWriter from './BatchedCustomerCsvFileWriter';
import Customer from './Customer';
class FilterUniqueEntries{
          
           constructor(private readonly batchedCustomerCsvWriter:BatchedCustomerCsvFileWriter){}

            public writeCustomers(fileName:string,customers:Customer[]){
                
              const customerSet = new Set<string>()
               
              const uniqueCustomers:Customer[] =[]

              customers.forEach( customer =>{
                       
                   const csvEntry =  FileWriterHelper.formatAsCsvRow(customer)

                   if(!customerSet.has(csvEntry)){
                        uniqueCustomers.push(customer)
                        customerSet.add(csvEntry)
                   }
              })
            
              this.batchedCustomerCsvWriter.writeCustomers(fileName,uniqueCustomers)
                
           }

       }
export default FilterUniqueEntries
