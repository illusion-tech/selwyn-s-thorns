import { 承诺 } from "./承诺.js";

const a = new 承诺((解决, 拒绝) => {
    拒绝("牛鼻");
})
    .然后(
        () => {},
        (原因) => {
            console.log({ 原因 });
            return "修好了";
        },
    )
    .然后((值) => {
        console.log({ 值 });
    });
const b = new 承诺((解决, 拒绝) => {
    解决("牛鼻");
})
    .然后(
        (值) => {
            console.log({ 值 });
            return `${值}plus`;
        },
        (原因) => {
            console.log({ 原因 });
        },
    )
    .然后((值) => {
        console.log({ 值 });
    })
    .最终(() => {
        console.log("最终");
    });

new Promise((resolve, reject) => {
    reject("niu bi");
})
    .then(
        () => {},
        (reason) => {
            console.log({ reason });
            return undefined;
            // return "I fix it.";
        },
    )
    .then((value) => {
        console.log({ value });
    });

console.log(a, b);
