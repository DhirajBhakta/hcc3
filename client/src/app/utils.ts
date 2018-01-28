export function replaceKeys(object:Object, metadata:Array<any>){
   for(let data of metadata){
     object[data.with] = object[data.replace];
     delete(object[data.replace]);
   }
   console.log('wow',object);
   return object;
}
