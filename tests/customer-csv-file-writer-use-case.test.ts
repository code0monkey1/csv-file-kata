import Customer from "../src/Customer"
import { FileWriter } from "../src/FileWriter"
import CustomerCsvFileWriter from "../src/customer-csv-file-writer-use-case"

describe('Customer CSV File writer',()=>{

    
   test('does exist',()=>{

          expect(CustomerCsvFileWriter).toBeInstanceOf(Function)
   })

   test("?",()=>{

       const customer:Customer=new Customer("Chiranjeev","007");

       const mockFileWriter:FileWriter={
           writeLine:jest.fn()
       }

       const sut = new CustomerCsvFileWriter(mockFileWriter);
   })


})