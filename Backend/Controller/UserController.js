import Track from '../Model/UserModel.js';

export const create=async(req,res)=>{
    try{
        const tracks=new Track(req.body)
        const {name}=tracks
        const ch=await Track.findOne({name})
        if(ch){
            res.status(200).json({message:"User Already Exists"})
        }
        else{
            const s=await tracks.save()
            res.status(200).json({message:s._id})
        }
    }
    catch(error){
        res.status(500).json({message:error})
    }
}

export const drink=async(req,res)=>{
    try{
        const id=req.params.id
        const drinking=req.params.drink
        console.log(id,drinking)
        const val=await Track.findById(id)
        if((parseFloat(val.drink)+parseFloat(drinking/val.count))<=drinking){
            const s = await Track.updateOne({_id:id},{ $set: { drink: parseFloat(val.drink)+parseFloat(drinking/val.count) } });
            res.status(200).json({message:val.drink})
        }
        else{
            const s = await Track.updateOne({_id:id},{ $set: { drink: parseFloat(0) } });
            res.status(200).json({message:"100%success"})
        }
        
    }
    catch(error){
        res.status(500).json({message:error})
    }
}

export const check=async(req,res)=>{
    try{
        const id=req.params.id;
    const uEx=await Track.findById(id)
    if(uEx){
        res.status(200).json({message:uEx})
        console.log(uEx)
    }
    else{
        res.status(200).json({message:"Not Found"})
    }
    }
    catch(error){
        res.status(500).json({message:error})
    }
}

export const update=async(req,res)=>{
    try{
        const id=req.params.id
        const val=req.body
        const uEx=await Track.findById(id)
        if(uEx){
            const s=await Track.updateOne({_id:id},{name:val.name,age:val.age,height:val.height,weight:val.weight,count:val.count})
            res.status(200).json({message:s})
        }
        else{
            res.status(200).json({message:"User Not Found"})
        }
    }
    catch(error){
        res.status(500).json({message:error})
    }
}

export const login=async(req,res)=>{
    try{
        const name=req.params.name
        const password=req.params.password
        const uEx=await Track.find({name})
        if(uEx){
            console.log(name,password,uEx)
            if(uEx[0].password==password){
                // console.log(uEx[0].password)
                res.status(200).json({message:uEx[0]._id})
            }
            else{
                console.log(uEx[0].password)
                res.status(200).json({message:"Wrong password"})
            }
        }
        else{
            res.status(200).json({message:"User not Found"})
        }
    }
    catch(error){
        res.status(500).json({message:error})
    }
}