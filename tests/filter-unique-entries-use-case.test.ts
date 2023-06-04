import BatchedCustomerCsvFileWriter from "../src/BatchedCustomerCsvFileWriter"
import { FileWriter } from "../src/FileWriter"

import FilterUniqueEntries from "../src/filter-unique-entries-use-case"
import CustomerHelper from "./CustomerHelper"
import FileWriterHelper from './FileWriterHelper'
describe("Filter Unique Entries",()=>{
   
   test("given entries of people , only unique entries are considered",()=>{
                 
               // Arrange
              
                const mockFileWriter:FileWriter=FileWriterHelper.createFileWriter()
        
                const customerCsvFileWriter = FileWriterHelper. createCsvFileWriter(mockFileWriter)

                const batchedCustomerCsvFileWriter = new BatchedCustomerCsvFileWriter(customerCsvFileWriter,10)
                 
                const sut = new FilterUniqueEntries(batchedCustomerCsvFileWriter)
                
                const fileName = 'customers.csv';

                const customers = [
                  
                      ...CustomerHelper.createCustomers(10),
                      ...CustomerHelper.createCustomers(10)
                ]

              // Apply

                sut.writeCustomers(fileName,customers)

                expect(mockFileWriter.writeLine).toBeCalledTimes(10)
     
  })

   test(" if persons array is null , then FilterUnique entries will throw error : `customers` is null ",()=>{
                 
               // Arrange
              
                const mockFileWriter:FileWriter=FileWriterHelper.createFileWriter()
        
                const customerCsvFileWriter = FileWriterHelper. createCsvFileWriter(mockFileWriter)

                const batchedCustomerCsvFileWriter = new BatchedCustomerCsvFileWriter(customerCsvFileWriter,10)
                 
                const sut = new FilterUniqueEntries(batchedCustomerCsvFileWriter)
                
                const fileName = 'customers.csv';

              // Apply

                expect(()=>sut.writeCustomers(fileName,null!)).toThrowError('`customers` is null')

                expect(mockFileWriter.writeLine).toBeCalledTimes(0)
     
  })
  }

)

