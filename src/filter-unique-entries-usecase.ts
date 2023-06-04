import BatchedCustomerCsvFileWriter from './BatchedCustomerCsvFileWriter';
import Customer from './Customer';
class FilterUniqueEntries{
          
           constructor(private readonly batchedCustomerCsvWriter:BatchedCustomerCsvFileWriter){}

            public writeCustomers(fileName:string,customers:Customer[]){

              

           }

       }
export default FilterUniqueEntries
