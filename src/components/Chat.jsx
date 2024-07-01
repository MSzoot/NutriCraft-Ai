import { useState, useEffect } from "react";
import axios from "axios";

// this works on local server but .env has to be ignored by github and netlify delpoys from github. I've found workaround and  added custom variable on netlify to inject here before deploy.
const apiKey = import.meta.env.VITE_API_KEY;

// Function to format the response for readability
const ChatResponse = ({ response }) => {
  const formatResponse = (response) => {
    const formattedResponse = response
      .replace(/Breakfast:/g, '<h2 class="text-lg font-bold">Breakfast:</h2>')
      .replace(/Lunch:/g, '<h2 class="text-lg font-bold">Lunch:</h2>')
      .replace(/Dinner:/g, '<h2 class="text-lg font-bold">Dinner:</h2>')
      .replace(/Snack:/g, '<h2 class="text-lg font-bold">Snack:</h2>')
      .replace(
        /Daily Total:/g,
        '<h2 class="text-lg font-bold">Daily Total:</h2>'
      )
      .replace(/\n/g, "<br/>");

    // inject raw formated html  to dangerouslySetInnerHTML
    return { __html: formattedResponse };
  };

  return (
    <div
      className="mt-20 p-4 text-white"
      dangerouslySetInnerHTML={formatResponse(response)}
    />
  );
};

const Chat = () => {
  // get data from local storage
  const tdee = localStorage.getItem("tdee");
  const macros = JSON.parse(localStorage.getItem("macros"));
  const proteins = macros.protein.toFixed(0);
  const carbs = macros.carbs.toFixed(0);
  const fat = macros.fat.toFixed(0);
  const foodOptions = localStorage.selectedFood;

  // use data for chat gpt prompt
  const message = `Generate a personalized diet plan for one day, targeting approximately ${tdee} calories, with a focus on achieving ${proteins} grams of protein, ${carbs} grams of carbohydrates, and ${fat} grams of fat. Ensure the plan includes at least three meals but no more than five and is both nutritious and delicious. Incorporate a variety of foods, with an emphasis on the following ingredients: ${foodOptions}. Don't use oz use grams only. Make the answer not longer than 800 characters. Give short preparing instructions. Write summary for daily total calories, protein carbs and fat.`;

  // states + loading state for processing... button to show
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false); // Track - message sent ?

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
            Authorization: `Bearer ${apiKey}`,
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
  }, [response]);

  return (
    <div className="mb-20">
      {loading ? (
        <button
          type="button"
          className="btn-primary btn mt-10 animate-pulse"
          disabled
        >
          Processing...
        </button>
      ) : (
        // if no loading then display formatted response
        <ChatResponse response={response} />
      )}
    </div>
  );
};

export default Chat;
