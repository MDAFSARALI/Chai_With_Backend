const asynhandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}
export {asynhandler};




// METHOD 2 
// const asynhandler=()=>{}
// const asynhandler=(func)=>()=>{}
// const asynhandler=(func)=>async()=>{}

// const asynhandler=(fn)=> async(req,res,next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }