import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  Text,
  useColorMode,
  Motion,
} from "@yamada-ui/react";
import { useEffect, useRef, useState } from "react";
import { addSentence, getSentence } from "./utils/supabaseFunctions";
import { Diary } from "./domain/Diary";
import { SubmitHandler, useForm } from "react-hook-form";

export type Inputs = {
  sentence: string;
};

function App() {
  const [diary, setDiary] = useState<Diary[]>([]);
  const { register, handleSubmit } = useForm<Inputs>();
  const containerRef = useRef<HTMLDivElement>(null);

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

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          w="full"
          p={4}
          color="#3f3f3f"
          borderRadius="md"
          boxShadow="sm"
          mb={4}
        >
          <Button onClick={toggleColorMode} mb={2} bg="#f7e9d2" color="black">
            {colorMode === "light" ? "ダーク" : "ライト"}モードに切り替える
          </Button>
          <FormControl isInvalid label="ひとこと" mb={4}>
            <Input
              placeholder=""
              size="lg"
              {...register("sentence", { required: "入力してね" })}
            />
          </FormControl>
          <Motion
            as="button"
            type="submit"
            ml="auto"
            display="block"
            whileTap={{ scale: 1.1 }}
            onTap={(ev, { point }) =>
              console.log("Tap ends", "x:", point.x, "y:", point.y)
            }
            onTapStart={(ev, { point }) =>
              console.log("Tap starts", "x:", point.x, "y:", point.y)
            }
            onTapCancel={(ev, { point }) =>
              console.log("Tap cancels", "x:", point.x, "y:", point.y)
            }
            p="md"
            rounded="md"
            bg="#ddaf7e"
            color="white"
          >
            つぶやく
          </Motion>
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
            <Motion
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              viewport={{ root: containerRef }}
              transition={{ duration: 1 }}
              onViewportEnter={(entry) => console.log("Scroll entires", entry)}
              onViewportLeave={(entry) => console.log("Scroll leaves", entry)}
              p="md"
              rounded="md"
              bg="white"
            >
              <Text mb={2}>{diary.sentence}</Text>
              <Text fontSize="sm" color="gray.500" textAlign="right">
                {new Date(diary.date).toLocaleString()}
              </Text>
            </Motion>
          </Box>
        ))}
      </VStack>
    </>
  );
}

export default App;
