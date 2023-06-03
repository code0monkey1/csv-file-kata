import Customer from "../src/Customer";
import CustomerTestHelper from "../src/CustomerTestHelper";
import { FileWriter } from '../src/FileWriter';
import CustomerCsvFileWriter from "../src/customer-csv-file-writer-use-case";
describe('Customer CSV File writer',()=>{

  describe("one customer",()=>{
        test.each([
    
        {   customer:CustomerTestHelper.customers[0] },
        {   customer:CustomerTestHelper.customers[0] }
    
    ])("for customer: $customer._name $customer._contactNumber",({customer})=>{
            
        //Arrange
            const mockFileWriter:FileWriter=createFileWriter()
    
            const sut = createCsvFileWriter(mockFileWriter)

             const fileName = 'customers.csv';
        
        //Act
              sut.execute(fileName,[customer])
    
        //Assert
            expect(mockFileWriter.writeLine).toHaveBeenCalledTimes(1)
                    
            assertCustomerWasWrittenToFile(mockFileWriter,"customers.csv",customer)
    
        })

  })


    describe("many customers",()=>{
        test.each([
    
        {
            customers:CustomerTestHelper.customers,
            expected:CustomerTestHelper.customerSignatures
        },
        
        
    
    ])("for customer: $customer._name $customer._contactNumber , expected: $expected",({customers})=>{
            
            //Arrange
            
            const mockFileWriter:FileWriter=createFileWriter()
            
            const sut = createCsvFileWriter(mockFileWriter)
            const fileName = 'customers.csv';

            //Act
                sut.execute(fileName,customers)

            //Assert
                expect(mockFileWriter.writeLine).toHaveBeenCalledTimes(customers.length)


            assertCustomerWasWrittenToFile(mockFileWriter,fileName,customers[0])
            assertCustomerWasWrittenToFile(mockFileWriter,fileName,customers[1])
            assertCustomerWasWrittenToFile(mockFileWriter,fileName,customers[2])
            assertCustomerWasWrittenToFile(mockFileWriter,fileName,customers[3])
            assertCustomerWasWrittenToFile(mockFileWriter,fileName,customers[4])
            assertCustomerWasWrittenToFile(mockFileWriter,fileName,customers[5])
           
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
                    .toHaveBeenCalledWith(fileName,customer.toString())
   }
