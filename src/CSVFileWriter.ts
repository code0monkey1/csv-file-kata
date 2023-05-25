class CSVFileWriter {
   
    private fw:FileWriter|null = null;
    
    public writerCustomers(fileName:string,customers:Customer[]){


    }

}


class Customer{

  constructor(private readonly  name:string, private readonly  contactNumber:string){}

  public toString(){
    
     return this.name+" "+this.contactNumber

  }
  
}

interface FileWriter{
    
  writeLine:(fileName:string,line:string)=>void

}