import Customer from "../src/Customer"

 function createCustomers(numberOfCustomers:number){
        const customers=[]

        for(let i=0;i<numberOfCustomers;i++){
            customers.push(createCustomer((i).toString(),(i).toString()))
        }

        return customers
   }

     // to remove the constructor details 
   function createCustomer(name:string,contactNumber:string):Customer{
     return  new Customer(name,contactNumber)
   }

export default {
  createCustomers
}
