import {
  Box,
  Button,
  ErrorMessage,
  FormControl,
  Input,
} from "@yamada-ui/react";
import { useEffect, useState } from "react";
import { addSentence, getSentence } from "./utils/supabaseFunctions";
import { Diary } from "./domain/Diary";
import { SubmitHandler, useForm } from "react-hook-form";

export type Inputs = {
  sentence: string;
};

function App() {
  const [diary, setDiary] = useState<Diary[]>([]);
  const { handleSubmit } = useForm<Inputs>();

  //表示
  useEffect(() => {
    async function fetchData() {
      try {
        const sentenceData = await getSentence();
        if (!sentenceData) {
          console.error("Failed to fetch sentence data");
          return;
        }
        console.log(sentenceData);
        setDiary(sentenceData.map((data) => new Diary(data.id, data.sentence)));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  //追加
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    try {
      const addSentenceData = await addSentence(data.sentence);

      console.log(addSentenceData.sentence);

      setDiary([
        {
          id: addSentenceData.id,
          sentence: addSentenceData.sentence,
        },
      ]);
      console.log(addSentenceData);
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          w="full"
          p="md"
          bg={{
            base: "#fcf8f1",
          }}
          color="#3f3f3f"
        >
          <FormControl isInvalid label="ひとこと">
            <Input placeholder="" size="lg" />
            <ErrorMessage color="gray.300">入力してね</ErrorMessage>
          </FormControl>

          <Button
            type="submit"
            bg={{
              base: "#e5b76f",
            }}
            color="white"
          >
            つぶやく
          </Button>
        </Box>
      </form>
      {/* Render test data */}
      {diary.map((diary) => (
        <div key={diary.id}>{diary.sentence}</div>
      ))}
    </>
  );
}

export default App;
