import BatchedCustomerCsvFileWriter from './BatchedCustomerCsvFileWriter';
import Customer from './Customer';
class FilterUniqueEntries{
          
           constructor(private readonly batchedCustomerCsvWriter:BatchedCustomerCsvFileWriter){}

            public writeCustomers(fileName:string,customers:Customer[]){
                
              const customerSet = new Set<string>()

              customers.forEach( customer =>{
                       
                   const csvEntry = 
              })
            
              this.batchedCustomerCsvWriter.writeCustomers(fileName,customers)
                

           }

       }
export default FilterUniqueEntries
