export const cleanText = (text: string) => {
  return text.replace(/<sup[^>]*>.*?<\/sup>/g, "");
};
