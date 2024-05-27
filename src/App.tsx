import { MultiDatePicker } from "@yamada-ui/calendar";
import { Box, Button, Input } from "@yamada-ui/react";

function App() {
  return (
    <>
      <Box
        w="full"
        p="md"
        bg={{
          base: "#fcf8f1",
        }}
        color="#3f3f3f"
      >
        <Input placeholder="ひとこと" size="lg" />
        <MultiDatePicker placeholder="YYYY/MM/DD" size="sm" today />
        <Button
          bg={{
            base: "#e5b76f",
          }}
          color="white"
        >
          つぶやく
        </Button>
      </Box>
    </>
  );
}

export default App;
