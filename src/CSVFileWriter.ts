class CSVFileWriter {
   
    private fs:FileSystem|null = null;
    
    public writerCustomers(fileName:string,customers:Customer[]){


    }


}


class Customer{

  private name:string=''
  private contactNumber:string=''

  // constructor(private readonly  name, private readonly  contactNumber){}

  public toString(){
    
     return this.name+this.contactNumber

  }
}

interface FileSystem{
    
  writeLine:(fileName:string,line:string)=>void

}