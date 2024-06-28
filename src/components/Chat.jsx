import { useState, useEffect } from "react";
import axios from "axios";

const ChatResponse = ({ response }) => {
  // Function to format the response for readability
  const formatResponse = (response) => {
    const lines = response.split("\n");
    const formattedLines = [];
    let currentSection = null;

    lines.forEach((line, index) => {
      if (line.startsWith("**")) {
        if (currentSection) {
          formattedLines.push(
            <div key={index} className="mb-4">
              {currentSection}
            </div>
          );
        }
        currentSection = [
          <h2 key={index} className="text-lg font-bold">
            {line.replace(/\*\*/g, "")}
          </h2>,
        ];
      } else if (line.startsWith("- ")) {
        if (!currentSection) {
          currentSection = [];
        }
        currentSection.push(<li key={index}>{line.replace("- ", "")}</li>);
      } else if (line.startsWith("Total:")) {
        if (currentSection) {
          formattedLines.push(
            <div key={index} className="mb-4">
              {currentSection}
            </div>
          );
          currentSection = null;
        }
        formattedLines.push(
          <h2 key={index} className="mt-4 text-lg font-bold">
            {line}
          </h2>
        );
      } else {
        if (!currentSection) {
          currentSection = [];
        }
        currentSection.push(
          <p key={index} className="mb-1">
            {line}
          </p>
        );
      }
    });

    if (currentSection) {
      formattedLines.push(
        <div key={lines.length} className="mb-4">
          {currentSection}
        </div>
      );
    }

    return formattedLines;
  };

  // Format the response
  const formattedResponse = formatResponse(response);

  return <div className="mt-20">{formattedResponse}</div>;
};

const Chat = () => {
  const tdee = localStorage.getItem("tdee");
  const macros = JSON.parse(localStorage.getItem("macros"));
  const proteins = macros.protein.toFixed(0);
  const carbs = macros.carbs.toFixed(0);
  const fat = macros.fat.toFixed(0);
  const foodOptions = localStorage.selectedFood;

  const message = `Generate a personalized diet plan for one day, targeting approximately ${tdee} calories, with a focus on achieving ${proteins} grams of protein, ${carbs} grams of carbohydrates, and ${fat} grams of fat. Ensure the plan includes at least three meals but no more than five and is both nutritious and delicious. Incorporate a variety of foods, with an emphasis on the following ingredients: ${foodOptions}. Please optimize the plan for taste, simplicity, and adherence to dietary goals. Don't use oz use grams only. Make it not more than 800 characters. Give short preparing instructions`;

  const [response, setResponse] = useState(""); // Response state
  const [loading, setLoading] = useState(false); // Loading state
  const [messageSent, setMessageSent] = useState(false); // Track if message has been sent

  // Function to send message to OpenAI API
  const sendMessage = async () => {
    try {
      setLoading(true); // Set loading to true before sending request
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: message },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`, // Ensure to replace this with your actual API key
          },
        }
      );

      // Set the response state
      setResponse(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error sending chat request:", error);
    } finally {
      setLoading(false); // Set loading to false after response is received
      setMessageSent(true); // Mark message as sent
    }
  };

  useEffect(() => {
    if (!response && !loading && !messageSent) {
      sendMessage(); // Send message only if not sent already
    }
  }, [response]); // Trigger useEffect only when response changes

  return (
    <div>
      {/* Button to show loading state */}
      {loading ? (
        <button
          type="button"
          className="btn-primary btn mt-10 animate-pulse"
          disabled
        >
          Processing...
        </button>
      ) : (
        // Display formatted response
        <ChatResponse response={response} />
      )}
    </div>
  );
};

export default Chat;
