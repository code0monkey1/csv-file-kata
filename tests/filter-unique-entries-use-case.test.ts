import BatchedCustomerCsvFileWriter from "../src/BatchedCustomerFileWriter"
import { FileWriter } from "../src/FileWriter"
import FilterUniqueEntries from "../src/filter-unique-entries-use-case"
import CustomerHelper from "./CustomerTestHelper"
import FileWriterHelper from './FileWriterTestHelper'
describe("Filter Unique Entries",()=>{
   
   test("given 4 entries of people ,with 2 having same names, only first unique entries are batched",()=>{
                 
               // Arrange
              
                const mockFileWriter:FileWriter=FileWriterHelper.createFileWriter()
        
                const customerCsvFileWriter = FileWriterHelper. createCsvFileWriter(mockFileWriter)

                const batchedCustomerCsvFileWriter = new BatchedCustomerCsvFileWriter(customerCsvFileWriter,10)
                 
                const sut = new FilterUniqueEntries(batchedCustomerCsvFileWriter)
                
                const fileName = 'customers.csv';

                const customers = [
                  
                      CustomerHelper.createCustomer("1","1"),
                      CustomerHelper.createCustomer("1","2"),
                      CustomerHelper.createCustomer("2","1"),
                      CustomerHelper.createCustomer("2","2"),
                ]

              // Apply

                sut.writeCustomers(fileName,customers)
          
                expect(mockFileWriter.writeLine).toBeCalledTimes(2)

                CustomerHelper
                .assertCustomersWereWrittenToFile(mockFileWriter,fileName,
                  [CustomerHelper.createCustomer("1","1"),CustomerHelper.createCustomer("2","1")])
     
  })

   test("if persons array is null , then FilterUnique for Batched entries will throw error : `customers` is null ",()=>{
               // Arrange
              
                const mockFileWriter:FileWriter=FileWriterHelper.createFileWriter()
        
                const customerCsvFileWriter = FileWriterHelper.createCsvFileWriter(mockFileWriter)
                 
                const sut = new FilterUniqueEntries(customerCsvFileWriter)
                
                const fileName = 'customers.csv';

              // Apply

                expect(()=>sut.writeCustomers(fileName,null!)).toThrowError('`customers` is null')

                expect(mockFileWriter.writeLine).toBeCalledTimes(0)
     
  })

     test("if there are no duplicates , the fileWriter must write all",()=>{

               // Arrange
               
                const mockFileWriter:FileWriter=FileWriterHelper.createFileWriter()
        
                const customerCsvFileWriter = FileWriterHelper.createCsvFileWriter(mockFileWriter)
                 
                const sut = new FilterUniqueEntries(customerCsvFileWriter)
                
                const fileName = 'customers.csv';

                // Apply

                sut.writeCustomers(fileName,CustomerHelper.createCustomers(3))
                
                // Assert

                expect(mockFileWriter.writeLine).toBeCalledTimes(3)
      
    })

        test("the unique contacts should be included, but all files should be written to debug files of bach 20",()=>{

               // Arrange
               
                const mockFileWriter:FileWriter=FileWriterHelper.createFileWriter()
        
                const customerCsvFileWriter = FileWriterHelper.createCsvFileWriter(mockFileWriter)
                 
                const debugWriter = new BatchedCustomerCsvFileWriter(customerCsvFileWriter,15000)

                const sut = new FilterUniqueEntries(debugWriter)
                
                const fileName = 'customers.csv';

                // Apply

                debugWriter.writeCustomers(fileName,[
                  CustomerHelper.createCustomer("a","1"),
                  CustomerHelper.createCustomer("a","2"),
                  CustomerHelper.createCustomer("b","1"),
                  CustomerHelper.createCustomer("b","2")
                ]
                  )

                sut.writeCustomers(fileName,[
                  CustomerHelper.createCustomer("a","1"),
                  CustomerHelper.createCustomer("a","2"),
                  CustomerHelper.createCustomer("b","1"),
                  CustomerHelper.createCustomer("a","2")
                ])
                
                // Assert

                expect(mockFileWriter.writeLine).toBeCalledTimes(6)
      
    })
  }

  

)

