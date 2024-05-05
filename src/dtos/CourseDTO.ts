export type CourseDTO = {
  id:number;
  image:number;
  background_image:number;
  default_thumb:number;
  name:string;
  description:string; 
}

export type InfoCourseDTO = {
  id:number;
  date_created:string;
  image:number;
  background_image:number;
  default_thumb:number;
  link_page:string;
  author:string;
  name:string;
  description:string;
  tags:string;
  community:number;
  completed:number;
  order:number;
  published:number;
  status:number; 
}