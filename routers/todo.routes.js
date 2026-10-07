import express from "express";
import {getTodoAll,getTodoById,createTodo,updateTodo,deleteTodo} from "../db/todo.quary.js";
import { searchBody, searchTitle } from "../utils/todo.search.js";
import { validationBody } from "../middleware/validationBody.js";
import { todoSchema } from "../schema/todo.schema.js";
import { todoUpdateSchema } from "../schema/todoupdate.js";

export const todoRouter=express.Router()

todoRouter.get("/",async(req,res)=>{
    // search title , body
    const {title , body}= req.query;
    if(title){
        const sTitle=await searchTitle(title);
        return res.json({
            data:sTitle
        });
    }
    else if(body){
        const sBody=await searchBody(body);
        return res.json({
            data:sBody
        });
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
    // title rreturn of body exist add or not -> todos.title , body
    const newTitle = title ?? todos.title;
    const newBody = body ?? todos.body;
    // done values storge in database , العكس القيمه موجوده
    if(todos.done === false){
         todos.done=true;
    }else{
         todos.done=false;
    }
    // upDate
    const update=await updateTodo(id,newTitle,newBody,todos.done);
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

