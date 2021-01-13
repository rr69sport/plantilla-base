const asyncFunction = async () => new Promise((resolve) => {
    setTimeout(() => {
        resolve('funciona');
    }, 2000);
})

const callAsyncFunction = async () => {
    console.log('esperando...');
    const result = await asyncFunction();
    console.log(result);
}

export default callAsyncFunction