export const res = {
  status:(code: number) => {
    return {json:(result:any) => {
      return result;
    }}
  }};
