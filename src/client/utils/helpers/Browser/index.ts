namespace Browser {
  export const truncate = (text:string = '', length: number) => {
    if (!text) {
      return null;
    }

    if (text.length > length) {
      return `${text.substring(0, length)}...`;
    }

    return text;
  };
}

export default Browser;
