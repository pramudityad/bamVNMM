export function toTimeZone(dateTime) {
    const dateIn = dateTime+' GMT+0000';
    const date = new Date(dateIn);
    const DateNow = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    return DateNow;
}

export function checkValue(props){
    //Swap undefined to null
    if( typeof props == 'undefined' ) {
      return null;
    }else{
      return props;
    }
}