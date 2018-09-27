export interface Gps {
    _id?: string,
    username: string,
    date:Date,
    num:string,
    location: [{any : {}}],
    deleted?:boolean
  }