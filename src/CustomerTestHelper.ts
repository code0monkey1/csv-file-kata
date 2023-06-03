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
                            new Customer("Chiranjeev","001"), 
                            new Customer("Chinu","002"),
                            new Customer("Jeevan","003"), 
                            new Customer("Zero","004"),
                            new Customer("Veeru","005"), 
                            new Customer("Heeru","006"),
                            new Customer("Boost","007"), 
                            new Customer("Complan","008"),
                            new Customer("Malto","009"), 
                            new Customer("Horlics","010"),
                            new Customer("Milo","010"),
  ]

export default {
  customers,
  customers11,
  customerSignatures
}
