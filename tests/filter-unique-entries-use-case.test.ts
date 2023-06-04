import BatchedCustomerCsvFileWriter from "../src/BatchedCustomerCsvFileWriter"
import { FileWriter } from "../src/FileWriter"
import FilterUniqueEntries from "../src/filter-unique-entries-use-case"
import CustomerHelper from "./CustomerHelper"
import FileWriterHelper from './FileWriterHelper'
describe("Filter Unique Entries",()=>{
   
   test("given entries of people , only unique entries are batched",()=>{
                 
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

                CustomerHelper
                 .assertCustomersWereWrittenToFile(mockFileWriter,fileName,customers)
                
                expect(mockFileWriter.writeLine).toBeCalledTimes(2)

                expect(mockFileWriter.writeLine)
                .toHaveBeenCalledWith('customers1.csv', 
                      CustomerHelper.createCustomer("1","1"))

                 expect(mockFileWriter.writeLine)
                .toHaveBeenCalledWith('customers1.csv', 
                      CustomerHelper.createCustomer("2","1"))
     
     
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
  }

  

)

