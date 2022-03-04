import {Location} from "history";

export type TItem = {
  _id:string;
  id:string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  image: string;
  image_mobile: string;
  image_large: string;
  price:number;
  __v: number;
  key: string;
  counter: number;
}

export type LocationState = {
  from: Location;
  background?: Location;
};
