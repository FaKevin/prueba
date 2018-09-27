export interface Ticket {
    _id?: string,
    username: string,
    date:Date,
    num:string,
    schedule: [{any : {}}]
  }