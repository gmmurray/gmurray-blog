export const toHyphenatedString = (input: string) =>
    input.toLocaleLowerCase().split(' ').join('-');
