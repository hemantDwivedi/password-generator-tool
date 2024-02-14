import express from 'express';



export const generatePasswordApi = async(req,res,next)=>{
    return res.status(200).json({success: true})
}

export const passwordStrengthVerifier = async(req,res,next)=>{
    return res.status(200).json({success: true})
}




export const sentMailApi = async(req,res,next)=>{
    return res.status(200).json({success: true})
}

export const suggestPasswordApi = async(req,res,next)=>{
    return res.status(200).json({success: true})
}

