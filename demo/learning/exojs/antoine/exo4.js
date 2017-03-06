// Your code here.
const prepend = function prepend(elt, list) {
  return {value: elt,
         rest:list}
}

const  arrayToList = function arrayToList(array) {
  let result = null;
  for (let i = array.length - 1; i >= 0; i--)
    result = prepend(array[i], result);
   return result;
}

const listToArray = function listToArray(list) {
  let result = []
	while(list.rest != null)
  {
     	result.push(list.value)
      list = list.rest;
  }
  result.push(list.value)
  return result;
}

const nth = function nth(list, index) {
	let i = 0;
  while (i != index && list.rest != null){
    list = list.rest
    i++;
  }
  return list.value
}
console.log(arrayToList([10, 20]));
// ? {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// ? [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// ? {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// ? 20