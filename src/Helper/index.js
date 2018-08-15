export const generatorCaptchaCode = (length) => {
    let result = [];
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        let char = possible.charAt(Math.floor(Math.random() * possible.length));
        result.push(char);
    }

    return result.join('')
};
