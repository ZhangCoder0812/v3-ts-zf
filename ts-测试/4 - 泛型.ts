// function createArray(len, value) {
//     let result = [];
//     for (let i = 0; i < len.length; i++) {
//         result.push(value);
//     }
//     return result;
// }

// let arr1 = createArray(3, "zf");

// 泛型 用来在代码执行时传入的类型 来确定结果
// value类型是什么 数组中就是什么类型
function createArray2<T>(len: number, value: T): T[] {
    let result = [];
    for (let i = 0; i < len; i++) {
        result.push(value);
    }
    return result;
}
//
let arr2 = createArray2<string>(3, "zf");
console.log(arr2);

// 多个泛型
// 实现元组的交换 [string,number] = [number,string]
const swap = (tuple: [string, number]): [number, string] => {
    return [tuple[1], tuple[0]];
};

swap(["1", 2]);

// 上面写的太死了 若是其他类型的反转就不行l
// 使用泛型来解决
const swap1 = <T, K>(tuple: [T, K]): [K, T] => {
    return [tuple[1], tuple[0]];
};
// 现在传入什么类型都可以反转
swap1(["1", 2]);
swap1([1, "2"]);
swap1([true, 1]);
// 当前页可以提前规定死
swap1<string, number>(["1", 2]);
