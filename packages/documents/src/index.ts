// Documents package entrypoint
export const generateDocument = async (type: string, data: any) => {
  return { type, data, generated: true };
};
