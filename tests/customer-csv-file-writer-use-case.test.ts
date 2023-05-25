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


    describe("two customers",()=>{
        test.each([
    
        {
        customers:[new Customer("Chiranjeev","007"), 
                     new Customer("Chinu","001")],
        expected:"Chiranjeev,007,Chinu,001"
        },
        //  {
        // customers:[new Customer("Chiranjeev","007"), 
        //              new Customer("Chinu","001")],
        // expected:"Chiranjeev,007,Chinu,001"
        // }
        
    
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
            expect(mockFileWriter.writeLine).toHaveBeenLastCalledWith("customers.csv",expected)
    
        })

  })



})