declare var SERVER: any;

declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}
