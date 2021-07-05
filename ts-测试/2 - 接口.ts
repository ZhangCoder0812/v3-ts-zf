// 接口：用来描述对象形状

interface ISchool {
    readonly name: string; // readonly 规定name只读 不能修改
    age: number;
    address?: string; // ? 可有可无
}

let school: ISchool = {
    name: "wade",
    age: 1,
    address: "上海",
};
// school.name = "xxx"; name只读 不能修改

// 接口可以扩展 IZf必须包含ISchool中的属性和type，其他还可以任意
interface IZf extends ISchool {
    type: string;
    [key: string]: any; // 还可以有其他任何类型
}
let zf: IZf = {
    type: "web",
    name: "lbj",
    age: 2,
    a: 1,
    b: "3",
};

// 类型断言 school2 中多了个lessons属性，但ISchool中并没有这个属性的规定
// 可以修改ISchool 那样会影响其他的。可以使用断言 表示school2这个队形就是 ISchool 这个类型
let school2: ISchool = {
    name: "wade",
    age: 1,
    address: "上海",
    lessons: ["架构课", "高级课"],
} as ISchool;

// 上面这个断言看上去像是自欺欺人，但是并不是所有的类型都可以断言 不是说一定就怎么怎么着
let x: number = 1;
// x as string; // 报错 不能随意断言
(x as any) as string; // 可以双重断言
