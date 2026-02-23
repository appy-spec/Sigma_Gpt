import "dotenv/config";

const getOpenAiResponse= async(message)=>{

  const options={

    method:"post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body:JSON.stringify({

      model: "gemini-2.5-flash",
      messages : [
        {
          "role": "user",
          "content": message,
        },
      ]
    }),
  }  

  try{

    const response=await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", options);
    const data=await response.json();

    if (!data.choices || !data.choices.length) {
      throw new Error("No choices returned from OpenAI");
    }
    return data.choices[0].message.content;
  }
  catch(err){

    console.log(err);
    throw new Error("Error during openai response");
  }
  
};

export default getOpenAiResponse;
