import Customer from "../src/Customer"
import CustomerTestHelper from "../src/CustomerTestHelper"
import { FileWriter } from "../src/FileWriter"
import CustomerCsvFileWriter from "../src/customer-csv-file-writer-use-case"
describe('Customer CSV File writer',()=>{

  describe("one customer",()=>{
        test.each([
    
        {   customer:CustomerTestHelper.customers[0],
            expected:CustomerTestHelper.customerSignatures[0]
        },
        {   customer:CustomerTestHelper.customers[0],
            expected:CustomerTestHelper.customerSignatures[0]
        }
    
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
        customers:CustomerTestHelper.customers.slice(0,2),
        expected:CustomerTestHelper.customerSignatures.slice(0,2)
            },
         {
        customers:CustomerTestHelper.customers.slice(2),
        expected:CustomerTestHelper.customerSignatures.slice(2)
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
                    expect(mockFileWriter.writeLine)
                    .toHaveBeenCalledWith("customers.csv",input)
             })
           
    })

  })

})