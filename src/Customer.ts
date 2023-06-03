class Customer{

  constructor(private  _name:string, private _contactNumber:string){}

  public get name(){
      return this._name
  }

  public get contactNumber(){
    return this._contactNumber
  }

  public set name(customerName:string){
       this._name=customerName
  }

  public set contactNumber(customerContactNumber:string){
    this._contactNumber=customerContactNumber
  }

  // public toString(){
  //  return this._name+","+this._contactNumber
  // }

}

export default Customer;