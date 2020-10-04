const asyncFunction = async () => new Promise((resolve) => {
    setTimeout(() => {
        resolve('solved function');
    }, 2000);
})

const callAsyncFunction = async () => {
    console.log('waiting...');
    const result = await asyncFunction();
    console.log(result);
}

export default callAsyncFunction