/**
 * Todo esto lo puede borar, solo es código de prueba :)
 */

const asyncFunction = async () => new Promise((resolve) => {
    setTimeout(() => {
        resolve('funcionando');
    }, 2000);
})

const callAsyncFunction = async () => {
    console.log('esperando...');
    const result = await asyncFunction();
    console.log(result);
}

export default callAsyncFunction
