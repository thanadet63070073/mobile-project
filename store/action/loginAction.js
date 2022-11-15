export const ACC_LOGIN = "ACC_LOGIN"

export const accountLogin = (account) => {
    return {type: ACC_LOGIN, account: account};
};