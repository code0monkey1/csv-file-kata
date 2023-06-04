import Customer from "../src/Customer"
import { FileWriter } from "../src/FileWriter"
import CustomerCsvFileWriter from "../src/customer-csv-file-writer-use-case"

  function createFileWriter():FileWriter{
       return {
            writeLine:jest.fn()
        }
   }  
   // this is done to isolate the construction details 
   function createCsvFileWriter(fileWriter:FileWriter):CustomerCsvFileWriter{
        return new CustomerCsvFileWriter(fileWriter)
   }


 function formatAsCsvRow(customer:Customer):string{
           return `${customer.name},${customer.contactNumber}`
       }

   export default{
    createCsvFileWriter,
    createFileWriter,
    formatAsCsvRow
   }