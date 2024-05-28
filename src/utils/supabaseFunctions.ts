import { supabase } from "./supabase";

export const getSentence = async () => {
  const sentence = await supabase.from("diary").select("*");
  console.log(sentence.data);
  if (sentence.error || !sentence.data) {
    console.error("Failed to get article data", sentence.error);
    return null;
  }
  return sentence.data;
};

export const addSentence = async (sentence: string) => {
  const response = await supabase
    .from("diary")
    .insert([
      {
        sentence,
      },
    ])
    .select();
  if (response.data !== null) {
    return response.data[0];
  }
};
