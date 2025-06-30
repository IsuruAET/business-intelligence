import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Fade,
  Slide,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import {
  Send as SendIcon,
  Lightbulb as LightbulbIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
} from "@mui/icons-material";
import { useAskQuestionMutation } from "./ragApi";

const sampleQuestions = [
  "What products are currently in stock?",
  "How many customers joined in 2023?",
  "What's the total revenue from completed orders?",
  "How many open support tickets are there?",
  "What products did John Doe order?",
  "What's our best selling product category?",
];

export const RAGForm = () => {
  const [question, setQuestion] = useState("");
  const [askQuestion, { data, isLoading, error }] = useAskQuestionMutation();

  const handleSubmit = async () => {
    if (question.trim()) {
      await askQuestion({ question });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSampleQuestion = (sampleQ: string) => {
    setQuestion(sampleQ);
  };

  return (
    <Fade in timeout={800}>
      <Paper
        elevation={24}
        sx={{
          maxWidth: 800,
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, #6366f1, #ec4899, #f59e0b, #10b981)",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: 4,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -50,
              right: -50,
              width: 100,
              height: 100,
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              animation: "float 6s ease-in-out infinite",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -30,
              left: -30,
              width: 60,
              height: 60,
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              animation: "float 4s ease-in-out infinite reverse",
            },
          }}
        >
          {/* Additional floating elements */}
          <Box
            sx={{
              position: "absolute",
              top: "20%",
              left: "10%",
              width: 20,
              height: 20,
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              animation: "float 5s ease-in-out infinite",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "60%",
              right: "15%",
              width: 15,
              height: 15,
              background: "rgba(255, 255, 255, 0.15)",
              borderRadius: "50%",
              animation: "float 7s ease-in-out infinite reverse",
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <PsychologyIcon sx={{ fontSize: 40, mr: 2 }} />
            <Typography
              variant="h1"
              sx={{ fontSize: "2.5rem", fontWeight: 700 }}
            >
              Business Intelligence AI
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
            Ask intelligent questions about your business data
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ padding: 4 }}>
          {/* Sample Questions */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              <LightbulbIcon sx={{ mr: 1, color: "primary.main" }} />
              Try these questions:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {sampleQuestions.map((sampleQ, index) => (
                <Chip
                  key={index}
                  label={sampleQ}
                  onClick={() => handleSampleQuestion(sampleQ)}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 2,
                    },
                  }}
                  variant="outlined"
                  className="bounce-on-hover"
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Question Input */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              <TrendingUpIcon sx={{ mr: 1, color: "secondary.main" }} />
              Ask your question:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Enter your business intelligence question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "1.1rem",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
          </Box>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={isLoading || !question.trim()}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
              sx={{
                background: "linear-gradient(45deg, #6366f1 30%, #ec4899 90%)",
                boxShadow: "0 3px 15px 2px rgba(99, 102, 241, 0.3)",
                padding: "12px 32px",
                fontSize: "1.1rem",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #4f46e5 30%, #db2777 90%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px 4px rgba(99, 102, 241, 0.4)",
                },
                "&:disabled": {
                  background: "rgba(0, 0, 0, 0.12)",
                  transform: "none",
                  boxShadow: "none",
                },
              }}
            >
              {isLoading ? "Analyzing..." : "Get Insights"}
            </Button>
          </Box>

          {/* Error Display */}
          {error && (
            <Slide direction="up" in={!!error} timeout={300}>
              <Alert severity="error" sx={{ mb: 3 }}>
                Failed to get answer. Please try again.
              </Alert>
            </Slide>
          )}

          {/* Answer Display */}
          {data && (
            <Slide direction="up" in={!!data} timeout={500}>
              <Paper
                elevation={2}
                sx={{
                  padding: 3,
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  border: "1px solid #e2e8f0",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "primary.main", fontWeight: 600 }}
                >
                  💡 AI Insights
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: "1.05rem",
                    color: "#374151",
                  }}
                >
                  {data.answer}
                </Typography>
              </Paper>
            </Slide>
          )}
        </Box>
      </Paper>
    </Fade>
  );
};
