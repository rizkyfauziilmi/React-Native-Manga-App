export const shortenSentence = (str, maxLength) => {
    // check if the string is already shorter than the maximum length
    if (str.length <= maxLength) {
        // if it is, return the original string
        return str;
    } else {
        // if it isn't, return the first `maxLength` characters of the string followed by an ellipsis (...)
        return str.substring(0, maxLength) + '...';
    }
}

export const getSinopsis = (str, value) => {
    let sinopsis = str.replace("Manga", "").replace("Manhwa", "").replace("Manhua", "").replace(` ${value.title} yang dibuat oleh komikus bernama `, "").replace(`${value.info.filter(item => item.hasOwnProperty('Pengarang')).map(item => item.Pengarang)} ini bercerita tentang `, "")
    return sinopsis
}