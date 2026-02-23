import express from "express";
import mongoose from 'mongoose';
import chatRoutes from "./routes/chat.js";
import "dotenv/config";

import OpenAI from 'openai';
import cors from "cors";

const app=express();
const Port=8080;

app.use(express.json());
app.use(cors());

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });

// const response = await client.responses.create({
//   model: 'gpt-4o-mini',
//   instructions: 'You are a coding assistant that talks like a pirate',
//   input: 'give a joke?',
// });

// console.log(response.output_text);

app.listen(Port, ()=>{

  console.log(`Server is runing on port ${Port}`);
  connectDb();
});

app.use("/api", chatRoutes);

const connectDb=async()=>{

  try{

    mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully");
  }
  catch(err){

    console.log("Failed to connect to db:", err);
  }

}

// app.post("/test", async(req, res)=>{

//   const options={

//     method:"post",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//     },
//     body:JSON.stringify({

//       model: "gpt-4o-mini",
//       messages : [
//         {
//           "role": "user",
//           "content": req.body.message,
//         },
//       ]
//     }),
//   }  

//   try{

//     const response=await fetch("https://api.openai.com/v1/chat/completions", options);
//     const data=await response.json();
//     res.send(data.choices[0].message.content);
//   }
//   catch(err){

//     console.log(err);
//   }

// });