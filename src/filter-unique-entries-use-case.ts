import Customer from './Customer';
import ICustomerFileWriter from './ICustomerFileWriter';

export default class FilterUniqueEntries implements ICustomerFileWriter{
          
           constructor(private readonly customerFileWriter:ICustomerFileWriter){}

            public writeCustomers(fileName:string,customers:Customer[]){
                
              if(customers === null){
                throw new Error('`customers` is null')
              }

              // getting only the element with the first index match , ignoring further index matches
              const uniqueCustomers:Customer[] =customers
                                                .filter((cust,index,array)=> array
                                                  .findIndex(customer => cust.name===customer.name )===index)


              // customers.forEach( customer =>{ 
              
              //      if(!customerSet.has(customer.name)){
              //           uniqueCustomers.push(customer)
              //           customerSet.add(customer.name)
              //      }
              // })
            
              this.customerFileWriter.writeCustomers(fileName,uniqueCustomers)
                
           }

       }
