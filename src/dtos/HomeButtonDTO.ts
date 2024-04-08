export type HomeButtonDTO = {
  id:number,
  type: 'default'|'light'|'info'|'success'|'warning'|'error'|'muted',
  icon: string,
  name: string,
  mobile_description:string,
  link:string,
  order:number,
  status:number
}
  