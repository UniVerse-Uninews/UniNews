import { temp_news } from './temp_news';

export interface university{
    id:string,
    createdAt:DateTime,
    updatedAt:DateTime,
    name:string,
    image:string,
    location:string,
    url:string,
    description:string,
    news:temp_news[]  
};