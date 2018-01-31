export function replaceKeys(object:Object, metadata:Array<any>){
   for(let data of metadata){
     object[data.with] = object[data.replace];
     delete(object[data.replace]);
   }
   return object;
}


//ISO date format is univeral: YYYY-MM-DDTHH:MM:SSZ
export function dateString(date: Date){
  return date.toISOString().split('T')[0];
}