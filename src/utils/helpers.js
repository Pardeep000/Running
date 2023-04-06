
export const helpers = {
    nameDivider: (name) => {
        const nameSplit = name.split(' ');
        console.log(nameSplit)
        if (nameSplit.length > 2) {
            const name = {}
            name.firstName = nameSplit[0]
            nameSplit.shift()
            name.lastName = nameSplit.join()
            return { ...name }
        }
        if (nameSplit.length < 2) {
            return { firstName: nameSplit[0], lastName: '' }
        }
        if (nameSplit.length == 2) {
            return { firstName: nameSplit[0], lastName: nameSplit[1] }
        }
    }
}