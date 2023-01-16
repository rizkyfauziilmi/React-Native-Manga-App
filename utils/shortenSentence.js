export default function shortenSentence(str, maxLength) {
    // check if the string is already shorter than the maximum length
    if (str.length <= maxLength) {
        // if it is, return the original string
        return str;
    } else {
        // if it isn't, return the first `maxLength` characters of the string followed by an ellipsis (...)
        return str.substring(0, maxLength) + '...';
    }
}