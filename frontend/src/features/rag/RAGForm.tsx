import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useAskQuestionMutation } from "./ragApi";

export const RAGForm = () => {
  const [question, setQuestion] = useState("");
  const [askQuestion, { data, isLoading }] = useAskQuestionMutation();

  const handleSubmit = async () => {
    if (question.trim()) {
      await askQuestion({ question });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "50px auto", textAlign: "center" }}>
      <TextField
        fullWidth
        label="Ask a question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        Ask
      </Button>
      {data && (
        <Typography sx={{ mt: 3 }} variant="h6">
          Answer: {data.answer}
        </Typography>
      )}
    </Box>
  );
};
