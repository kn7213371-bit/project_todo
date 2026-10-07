import z from "zod";

export function validationBody(schema){
    return async(req,res,next)=>{
        const body=req.body;
        const result = schema.safeParse(body);

        if(!result.success){
         return res.status(422).json({
         errors: z.treeifyError(result.error).properties
         });
        }
        next();
    }
}
