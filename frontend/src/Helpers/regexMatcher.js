export function isValidEmail(string) {
    return string.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
}

export function isValidPassword(string) {
    return string.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
}
