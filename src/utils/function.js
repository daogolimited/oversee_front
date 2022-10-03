import axios from "axios"
import { backUrl } from "../data/Data";
export function range(start, end) {
    let array = [];
    for (let i = start; i <= end; ++i) {
        array.push(i);
    }
    return array;
}
export const addItem = async (type, obj) => {
    const { data: response } = await axios.post(`/api/add${type}`, obj)
    alert(response.message);
    if (response.result > 0) {
        window.history.back();
    }
}
export const updateItem = async (type, obj) => {
    const { data: response } = await axios.post(`/api/update${type}`, obj)
    alert(response.message);
    if (response.result > 0) {
        window.history.back();
    }
}
export const deleteItem = async (type, obj) => {

}
export const commarNumber = (num) => {
    let str = "";
    if(typeof num == "number"){
       str = num.toString();
    }else{
        str = num;
    }
    let result = "";
    let count = 0;
    for (var i = str.length - 1; i >= 0; i--) {
        if(count%3==0&&count!=0)result = "," + result;
        result = str[i] + result;
        count++;
    }
    return result;
} 