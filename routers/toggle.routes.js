import { getTodoById, toggleDone } from "../db/todo.quary.js";
import express from "express";

export const toggleRouter=express.Router();

toggleRouter.patch("/:id/toggle",async(req,res)=>{
    const {id} = req.params;
    const todo=await getTodoById(id);
    if(!todo){
        return res.status(404).json({
            message:"Todo Not Found",
        });
    }

    const updateToggle=await toggleDone(id);

    return res.status(200).json({
        message:"Toggle Update Successful",
        date:updateToggle
    });

});