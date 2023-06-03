import Customer from "./Customer"


let customers:Customer[]=[
                            new Customer("Chiranjeev","007"), 
                            new Customer("Chinu","001"),
                            new Customer("Jeevan","007"), 
                            new Customer("Zero","001"),
                            new Customer("Veeru","002"), 
                            new Customer("Heeru","000"),
                          ]

let customerSignatures:string[]=customers.map(customer => customer.toString())


let customers11:Customer[]=[
  
]

export default {
  customers,
  customerSignatures
}
