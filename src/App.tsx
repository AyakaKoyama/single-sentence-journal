import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  Text,
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
  const { register, handleSubmit } = useForm<Inputs>();

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
        setDiary(
          sentenceData.map(
            (data) => new Diary(data.id, data.sentence, data.created_at)
          )
        );
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
          date: addSentenceData.date,
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
          p={4}
          bg="white"
          color="#3f3f3f"
          borderRadius="md"
          boxShadow="sm"
          mb={4}
        >
          <FormControl isInvalid label="ひとこと" mb={4}>
            <Input
              placeholder=""
              size="lg"
              {...register("sentence", { required: "入力してね" })}
            />
          </FormControl>

          <Button
            type="submit"
            bg="#e5b76f"
            color="white"
            ml="auto"
            display="block"
            _hover={{ bg: "#d49b5c" }}
          >
            つぶやく
          </Button>
        </Box>
      </form>
      {/* Render test data */}
      <Box p={4} rounded="md" bg="#f7e9d2" color="black" mb={4}>
        これまでのつぶやき
      </Box>

      <VStack p={4} align="stretch">
        {diary.map((diary) => (
          <Box
            key={diary.id}
            p={4}
            rounded="md"
            bg="white"
            color="#3f3f3f"
            boxShadow="sm"
            borderWidth="2px"
            borderColor="#f7e9d2"
          >
            <Text mb={2}>{diary.sentence}</Text>
            <Text fontSize="sm" color="gray.500" textAlign="right">
              {new Date(diary.date).toLocaleString()}
            </Text>
          </Box>
        ))}
      </VStack>
    </>
  );
}

export default App;
