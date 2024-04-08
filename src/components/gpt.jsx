import { useState } from "react";
import axios from "axios";

function ChatGPTIntegration() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "YOUR_CHATGPT_API_ENDPOINT",
        { question },
        {
          headers: {
            Authorization: `Bearer YOUR_API_KEY`,
          },
        }
      );
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button type="submit">Ask</button>
      </form>
      <div>
        <h2>Answer:</h2>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default ChatGPTIntegration;
