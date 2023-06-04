import Customer from './Customer';
import ICustomerFileWriter from './ICustomerFileWriter';

export default class FilterUniqueEntries implements ICustomerFileWriter{
          
           constructor(private readonly customerFileWriter:ICustomerFileWriter){}

            public writeCustomers(fileName:string,customers:Customer[]){
                
              const customerSet = new Set<string>()
               
              const uniqueCustomers:Customer[] =[]

              if(customers === null){
                throw new Error('`customers` is null')
              }

              customers.forEach( customer =>{ 
              
                   if(!customerSet.has(customer.name)){
                        uniqueCustomers.push(customer)
                        customerSet.add(customer.name)
                   }
              })
            
              this.customerFileWriter.writeCustomers(fileName,uniqueCustomers)
                
           }

       }
