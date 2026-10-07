import express from "express";
import {getTodoAll,getTodoById,createTodo,updateTodo,deleteTodo} from "../db/todo.quary.js";
import {searchBoth} from "../utils/todo.search.js";
import { validationBody } from "../middleware/validationBody.js";
import { todoSchema } from "../schema/todo.schema.js";
import { todoUpdateSchema } from "../schema/todoupdate.js";

export const todoRouter=express.Router()

todoRouter.get("/",async(req,res)=>{
    // search title , body
    const {search}= req.query;
   if(search){
    const sTodo=await searchBoth(search);
    return res.json({
        data:sTodo
    })
   }
    // get All Todo
    const todo=await getTodoAll();

    res.json({
        data:todo
    });
});

todoRouter.get("/:id",async(req,res)=>{
    const {id} = req.params;
    // get By Id
    const todoByID=await getTodoById(id);
    //check Id
    if(!todoByID){
        return res.status(404).json({
            messeage:"todo not found"
        });
    }

    return res.status(200).json({
        data:todoByID
    });
});

todoRouter.post("/",validationBody(todoSchema),async(req,res)=>{
    const {title,body}=req.body
    // create todo
    const created=await createTodo(title,body);

    return res.status(201).json({
        message:"Todo created successfully",
    });
});

todoRouter.patch("/:id",validationBody(todoUpdateSchema.optional()),async(req,res)=>{
    const {id}=req.params;
    const {title,body}=req.body;
    // check ID
    const todos=await getTodoById(id);
    if(!todos){
        return res.status(404).json({
            message:"Todo Not Found"
        });
    }
    // title return of body exist add or not -> todos.title , body -. ؟؟ -> operation null 
    const newTitle = title ?? todos.title;
    const newBody = body ?? todos.body;

    // upDate
    const update=await updateTodo(id,newTitle,newBody);
    // respone
    return res.status(200).json({
        message:"Todo Update successfull",
        data:update
    });

});

todoRouter.delete("/:id",async(req,res)=>{
    const {id}=req.params;
    // check todo BY ID
    const todos=await getTodoById(id);

    if(!todos){
        return res.status(404).json({
            message:"Todo Not Found"
        });
    }
    // Delete id
    const delTod=await deleteTodo(id);
    // response
    return res.status(200).json({
        "message":"Todo Delete Successfull",
        data:delTod
    });

});

