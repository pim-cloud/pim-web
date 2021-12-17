

const commonEffect = () => {
    const empty = (str) => {
        if (str === '') {
            return false
        }
        if (str === null) {
            return false
        }
        if (str === 'undefined') {
            return false
        }
        if (str === 'NaN') {
            return false
        }
        return true
    }
}
export default commonEffect