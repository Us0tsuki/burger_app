export const updateObject = (oldObject, updatedObject) => {
    return {
        ...oldObject,
        ...updatedObject
    };
};

export const validateFormEntry = (value, rules) => {
    if(!rules) return true;
    if(rules.required && value.trim() === '') return false;
    if(rules.minLen && value.length < rules.minLen) return false;
    if(rules.maxLen && value.length > rules.maxLen) return false;
    if(rules.isEmail && !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)) return false;
    if(rules.isPhone && !/^\d{10}$/.test(value)) return false;
    if(rules.isNumeric && !/^\d+$/.test(value)) return false;
    return true;
};