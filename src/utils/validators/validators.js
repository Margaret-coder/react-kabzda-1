export const required = (value) => {
    console.log('-------///VALIDATOR', value)
    if(value) {
        return undefined
    }
    else {
        console.log("-------////Field is required VALUE", value)
        return "Field is required"
    }
}

export const maxLengthCreator = (maxLength) => (value) => {
    if(value.length > maxLength) return `Max length is ${maxLength} symbols`
    return undefined
}

