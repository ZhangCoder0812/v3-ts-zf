// 函数主要关系返回值 和 参数

function sum1(a: string, b: string): string {
    return a + b;
}
sum1("a", "b");

// 可以通过表达式来定义
const sum2 = (a: number, b: number): number => a + b; // 不写返回值类型会自动推断
// 也可以写 sum3: (a: number, b: number) => number 表示sum3是一个函数 返回number类型
// 并不是函数声明 只是一个类型规定
const sum3: (aa: number, bb: number) => number = (a: number, b: number): number => a + b;

sum3(1, 2);

// 上面sum3写的类型规定太长了 不易观看 可以起个别名 声明一个类型
type Sum = (aa: number, bb: number) => number | string;
// 或者使用接口
interface ISum {
    (aa: number, bb: number): number;
}
const sum4: Sum = (a: number, b: number): number => a + b;

// 区别：interface可以继承 还可以被类实现
//       type仅仅是一个别名 可以使用联合类型 定义临时变量时可以使用
// 表示Sum1 可以函数或者字符串 但用接口就没法写
type Sum1 = ((aa: number, bb: number) => number) | string;
