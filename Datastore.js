const fs = require('fs');
module.exports = class Datastore{
  constructor(filename){
    this.filename = filename.split("").includes(":") ? filename : `${__dirname}/`+filename;
    this.content = fs.readFileSync(this.filename).toString().split("\n").filter(line=>!(line == "")).map(line=>JSON.parse(line));
  }
  get json(){
    return this.content.copy();
  }
  findSync(obj){
    if(Object.keys(obj).length == 0){
      return this.content;
    }
    let entries = [];
    for(let i = 0; i < this.content; i++)
      for(let key of Object.keys(obj))
        if(this.content[i].hasOwnProperty(key) && this.content[i][key] == obj[key])
          entries.push(this.content[i]);
    return entries;
  }
  async find(obj,callback=null){
    if(callback == null)
      throw new Error("No callback provided");
    if(typeof obj != "object")
      throw new Error("Invalid query");
    let error = null;
    if(Object.keys(obj).length == 0)
      return callback(error,this.content);
    let entries = [];
    for(let i = 0; i < this.content.length; i++){
      for(let key of Object.keys(obj)){
        if(this.content[i].hasOwnProperty(key) && this.content[i][key] == obj[key]){
          entries.push(this.content[i]);
        }
      }
    }
    callback(error,entries);
  }
  async update(query,change,callback=null){
    //Doesn't call callback
    this.find(query, async (err,databaseArray)=>{
      if(Object.keys(change).includes("$set")){
        for(let key of Object.keys(change["$set"])){
          for(let elem of databaseArray){
            elem[key] = change["$set"][key];
          }
        }
      }
      await this.refresh();
    });
  }
  async remove(query,callback=null){
    let error = null;
    let removed = 0;
    loop1:
    for(let i = 0; i < this.content.length; i++){
      let j = 0;
      for(; j < Object.keys(query).length; j++){
        let key = Object.keys(query)[j];
        if(!this.content[i].hasOwnProperty(key) || this.content[key] != query[key])
          break loop1;
      }
      if(j == Object.keys(query).length){
        this.content.splice(i,1);
        removed++;
        await this.refresh();
      }
    }
    if(callback)
      callback(error,removed);
  }
  async refresh(){
    fs.writeFile(this.filename,this.content.map(obj=>JSON.stringify(obj)).join("\n"),(err)=>{
      if(err) throw err;
      // console.log(this.content.map(obj=>JSON.stringify(obj)).join("\n"));
    });
  }
  insert(obj){
    this.content.push(obj);
    fs.appendFile(this.filename, `${JSON.stringify(obj)}\n`, err=>{if (err) throw err;});
  }
}