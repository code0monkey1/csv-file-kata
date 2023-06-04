import BatchedCustomerCsvFileWriter from "../src/BatchedCustomerCsvFileWriter"
import { FileWriter } from "../src/FileWriter"

import FilterUniqueEntries from "../src/filter-unique-entries-use-case"
import CustomerHelper from "./CustomerHelper"
import FileWriterHelper from './FileWriterHelper'
describe("Filter Unique Entries",()=>{
   
   test("given a files array , only write entries that are not duplicates",()=>{
                 
               // Arrange
              
                const mockFileWriter:FileWriter=FileWriterHelper.createFileWriter()
        
                const customerCsvFileWriter = FileWriterHelper. createCsvFileWriter(mockFileWriter)

                const batchedCustomerCsvFileWriter = new BatchedCustomerCsvFileWriter(customerCsvFileWriter,10)
                 
                const sut = new FilterUniqueEntries(batchedCustomerCsvFileWriter)
                
                const fileName = 'customers.csv';

                const customers = [
                    
                      CustomerHelper.createCustomer("a","1"),
                      CustomerHelper.createCustomer('a',"1"),
                      CustomerHelper.createCustomer("b","2"),
                      CustomerHelper.createCustomer("a","1"),
                      CustomerHelper.createCustomer('a',"1"),
                      CustomerHelper.createCustomer("b","2")
                ]

              // Apply

                sut.writeCustomers(fileName,customers)

                expect(mockFileWriter.writeLine).toBeCalledTimes(2)
     
  })

   test("given a files array , only write entries that are not duplicates",()=>{
                 
               // Arrange
              
                const mockFileWriter:FileWriter=FileWriterHelper.createFileWriter()
        
                const customerCsvFileWriter = FileWriterHelper. createCsvFileWriter(mockFileWriter)

                const batchedCustomerCsvFileWriter = new BatchedCustomerCsvFileWriter(customerCsvFileWriter,10)
                 
                const sut = new FilterUniqueEntries(batchedCustomerCsvFileWriter)
                
                const fileName = 'customers.csv';

                const customers = [
                    
                      CustomerHelper.createCustomer("a","1"),
                      CustomerHelper.createCustomer('a',"1"),
                      CustomerHelper.createCustomer("b","2"),
                      CustomerHelper.createCustomer("a","1"),
                      CustomerHelper.createCustomer('a',"1"),
                      CustomerHelper.createCustomer("b","2")
                ]

              // Apply

                sut.writeCustomers(fileName,customers)

                expect(mockFileWriter.writeLine).toBeCalledTimes(2)
     
  })
  }

)

