import BatchedCustomerCsvFileWriter from "../src/BatchedCustomerCsvFileWriter"
import { FileWriter } from "../src/FileWriter"

import FilterUniqueEntries from "../src/filter-unique-entries-use-case"
import CustomerHelper from "./CustomerHelper"
import FileWriterHelper from './FileWriterHelper'
describe("Filter Unique Entries",()=>{
   
   test("given a files array , only write entries that are not duplicates",()=>{
                 
               // Arrange
              
                const mockFileWriter:FileWriter=FileWriterHelper.createFileWriter()
        
                const customerCsvFileWriter =FileWriterHelper. createCsvFileWriter(mockFileWriter)

                const sut = new BatchedCustomerCsvFileWriter(customerCsvFileWriter,10)

                const fileName = 'customers.csv';

                const customers = CustomerHelper.createCustomers(20)

              // Apply

                sut.writeCustomers(fileName,customers)

                expect(mockFileWriter.writeLine).toBeCalledTimes(20)
     
  })
  }

)

