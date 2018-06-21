
export function replaceKeys(object: Object, metadata: Array<any>){
   for (const data of metadata){
     object[data.with] = object[data.replace];
     delete(object[data.replace]);
   }
   return object;
}

export function prepareURL(...args){
  return args.reduce((accumulator, current) => accumulator + current + '/', []);
}

export function addParams(params) {
  return '?' + Object.keys(params).map(function(key){
    return key + '=' + params[key];
  }).join('&');
}

//ISO date format is univeral: YYYY-MM-DDTHH:MM:SSZ
export function dateString(date: Date){
  return date.toISOString().split('T')[0];
}
export function copy_time(moment, date: string, new_date: any) {
  const temp = moment(date);
  new_date.seconds(temp.seconds());
  new_date.minutes(temp.minutes());
  new_date.hours(temp.hours());
  return new_date.toISOString();
}
