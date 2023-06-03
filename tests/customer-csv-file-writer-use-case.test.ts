import Customer from "../src/Customer"
import { FileWriter } from "../src/FileWriter"
import CustomerCsvFileWriter from "../src/customer-csv-file-writer-use-case"

describe('Customer CSV File writer',()=>{

  describe("one customer",()=>{
        test.each([
    
        {customer:new Customer("Chiranjeev","007"),expected:"Chiranjeev,007"},
        {customer:new Customer("Chinu","001"),expected:"Chinu,001"}
    
    ])("for customer: $customer._name $customer._contactNumber , expected: $expected",({customer,expected})=>{
            
        //Arrange
            const mockFileWriter:FileWriter={
                writeLine:jest.fn()
            }
    
            const sut = new CustomerCsvFileWriter(mockFileWriter);
        
        //Act
              sut.execute('customers.csv',[customer])
    
        //Assert
            expect(mockFileWriter.writeLine).toHaveBeenCalledTimes(1)
            expect(mockFileWriter.writeLine).toHaveBeenCalledWith("customers.csv",expected)
    
        })

  })


    describe("many customers",()=>{
        test.each([
    
        {
        customers:[new Customer("Chiranjeev","007"), 
                     new Customer("Chinu","001"),
                     new Customer("Jeevan","007"), 
                     new Customer("Zero","001")
                    ],
        expected:["Chiranjeev,007","Chinu,001","Jeevan,007","Zero,001"]
        },
         {
        customers:[new Customer("Veeru","002"), 
                     new Customer("Heeru","000")],
        expected:["Veeru,002","Heeru,000"]
        },
        
    
    ])("for customer: $customer._name $customer._contactNumber , expected: $expected",({customers,expected})=>{
            
        //Arrange
        
        const mockFileWriter:FileWriter={
            writeLine:jest.fn()
        }

        const sut = new CustomerCsvFileWriter(mockFileWriter);
         
        //Act
            sut.execute('customers.csv',customers)

        //Assert
            expect(mockFileWriter.writeLine).toHaveBeenCalledTimes(customers.length)

             expected.forEach( input =>{
                    expect(mockFileWriter.writeLine).toHaveBeenCalledWith("customers.csv",input)
             })
           


    })

  })

})