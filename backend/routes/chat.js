import express from "express";
const router=express.Router();

import Thread from "../models/Thread.js";
import getOpenAiResponse from "../utils/openai.js";

router.post("/test", async(req, res)=>{

    const chats=new Thread({

        threadId:"abc",
        title:"This is just a taril thread2",
    });

    try{

        const newChat=await chats.save();
        res.send(newChat);
    }
    catch(err){

        console.log(err);
        res.status(500).json({error:"Failed to save data"});
    }
});

router.get("/thread", async(req, res)=>{

    try{

        const threads=await Thread.find({});
        if(!threads){

            res.status(404).json({error: "Failed to get thread"});
            return;
        }

        res.send(threads);
    }
    catch(err){

        console.log(err);
        res.status(500).json({error: "Error during finding the thread"});
    }
});

router.get("/thread/:threadId", async(req, res)=>{

    const {threadId}=req.params;
    try{

        const threads=await Thread.findOne({threadId:threadId});
        if(!threads){

            res.status(404).json({error: "Failed to get thread"});
            return;
        }

        res.send(threads);
    }
    catch(err){

        console.log(err);
        res.status(500).json({error: "Error during finding the thread"});
    }

});

router.delete("/thread/:threadId", async(req, res)=>{

    const {threadId}=req.params;
    try{

        const threads=await Thread.findOneAndDelete({threadId:threadId});
        if(!threads){

            res.status(404).json({error: "Failed to delete thread"});
            return;
        }

        res.status(200).json({success: "Thread deleted Successfully"});
    }
    catch(err){

        console.log(err);
        res.status(500).json({error: "Error during deleting the thread"});
    }
});

router.post("/chat", async(req, res)=>{

    const {threadId, message} =req.body;
    
    if(!threadId || !message){

        res.status(400).json({error:"Neccessy filed is missing"});
        return;
    }

    try{

        let thread= await Thread.findOne({threadId:threadId});
    
        if(!thread){

            thread=new Thread({

                threadId:threadId,
                title:message,
                message:[{role:"user",content:message}],
            }); 
        }
        else{

            thread.message.push({role:"user", content:message});
        }

        const assistantReply=await getOpenAiResponse(message);
        thread.message.push({role:"assistant", content:assistantReply});
        
        thread.updatedAt=new Date();
        await thread.save();
        res.json({reply:assistantReply});

    }
    catch(err){

        console.log(err);
        res.status(500).json({error:"Something went wrong during openai calls"});
    }
});

export default router;
