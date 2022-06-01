let errorHandler = async (req,res,next)=>{
   
    let {errorCode} = req.smartShelf;
    let errorMsg = "";
    if(errorCode === 'missing required values'){
        errorMsg = "Missing required values!!";
    }
    if(errorCode === 'Account already exist'){
        errorMsg = "Account already exist!!";
    }
    if(errorCode === 'invalid user data'){
        errorMsg = "invalid user data!!";
    }
    if(errorCode === 'invalid user creds'){
        errorMsg = "invalid user creds!!";
    }
    if(errorCode === 'user not exist'){
        errorMsg = "User doesn't exist!!";
    }
    if(errorCode === 'category already exist'){
        errorMsg = "category already exist";
    }
    if(errorCode === 'category not exist'){
        errorMsg = "category not exist";
    }
    if(errorCode === 'product already exist'){
        errorMsg = "product already exist";
    }
    if(errorCode === 'product not exist'){
        errorMsg = "product not exist";
    }
    if(errorCode === 'shelf not exist'){
        errorMsg = "shelf not exist";
    }
    res.status(400).json({success:false,error:errorMsg});

}

const endPointNotFound = (req,res,next)=>{
    if(req.smartShelf){
        next();
        return;
    }
    res.status(404).json({success:false,error:"End point not found"});
}

module.exports = {errorHandler,endPointNotFound};