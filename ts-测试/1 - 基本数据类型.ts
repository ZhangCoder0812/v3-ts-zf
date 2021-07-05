// 配合code-runner插件运行ts 需要npm install typescript ts-node -g

// ts中冒号后面的都是类型
const str: string = "wade";
const num: number = 123;
const flag: boolean = true;
let n: null = null;
let u: undefined = undefined;

// 联合类型
const age: string | number = "12";

// 对象 数组 函数
const arr: number[] = [1, 2, 3];

// 元组 类型,值一一对应
const tuple: [string, number] = ["1", 2];

// 枚举
enum UER_ROLE {
    COMMON,
    ADMIN,
}
console.log(UER_ROLE.ADMIN);

// object类型 非原始数据类型
const create = (obj: object) => { };
create({});
