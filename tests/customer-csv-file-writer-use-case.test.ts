import Customer from "../src/Customer";
import CustomerTestHelper from "../src/CustomerTestHelper";
import { FileWriter } from '../src/FileWriter';
import CustomerCsvFileWriter from "../src/customer-csv-file-writer-use-case";
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
            const mockFileWriter:FileWriter=createFileWriter()
    
            const sut = createCsvFileWriter(mockFileWriter)
        
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
            customers:CustomerTestHelper.customers,
            expected:CustomerTestHelper.customerSignatures
        },
        
        
    
    ])("for customer: $customer._name $customer._contactNumber , expected: $expected",({customers,expected})=>{
            
        //Arrange
        
        const mockFileWriter:FileWriter=createFileWriter()
        
        const sut = createCsvFileWriter(mockFileWriter)
        //Act
            sut.execute('customers.csv',customers)

        //Assert
            expect(mockFileWriter.writeLine).toHaveBeenCalledTimes(customers.length)

        
            assertCustomerWasWrittenToFile(mockFileWriter,"",createCustomer("Chiranjeev",'100'))
             
           
    })

  })

})

   function createFileWriter():FileWriter{
       return {
            writeLine:jest.fn()
        }
   }  
   // this is done to isolate the construction details 
   function createCsvFileWriter(fileWriter:FileWriter):CustomerCsvFileWriter{
        return new CustomerCsvFileWriter(fileWriter)
   }

   // to remove the constructor details 
   function createCustomer(name:string,contactNumber:string):Customer{
     return  new Customer(name,contactNumber)
   }

   function assertCustomerWasWrittenToFile(fileWriter:FileWriter,fileName:string,customer:Customer){
         expect(fileWriter.writeLine)
                    .toHaveBeenCalledWith("customers.csv",customer.toString())
   }
