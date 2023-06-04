
import FileWriterHelper from '../tests/FileWriterHelper';
import Customer from './Customer';
import ICustomerFileWriter from './ICustomerFileWriter';

class FilterUniqueEntries implements ICustomerFileWriter{
          
           constructor(private readonly customerFileWriter:ICustomerFileWriter){}

            public writeCustomers(fileName:string,customers:Customer[]){
                
              const customerSet = new Set<string>()
               
              const uniqueCustomers:Customer[] =[]

              if(customers === null){
                throw new Error('`customers` is null')
              }

              customers.forEach( customer =>{ 
                       
                   const csvEntry =  FileWriterHelper.formatAsCsvRow(customer)

                   if(!customerSet.has(csvEntry)){
                        uniqueCustomers.push(customer)
                        customerSet.add(csvEntry)
                   }
              })
            
              this.customerFileWriter.writeCustomers(fileName,uniqueCustomers)
                
           }

       }
export default FilterUniqueEntries
