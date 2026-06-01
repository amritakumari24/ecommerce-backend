const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res)=> {

try{

    const {name, password, email} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email, 
        password: hashedPassword
    });
   res.status(201).json(user);

}catch(error){


res.status(500).json({
    message: error.message
});

}
}


exports.login = async(req, res)=>{
    try{
   const {email, password} = req.body;
   const user = await User.findOne({email});

   if(!user){
      return res.status(400).json({
        message: "user not found!"
     });
   }


const isMatch = await bcrypt.compare(
    password,
    user.password
)


   if(!isMatch){
    return res.status(400).json({
        message : "invalid password"
    })
   }

   const token = jwt.sign(
    {id: user._id},
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
   )


   res.json({
    token
   
})

    }catch(error){
res.status(500).json({
    message: error.message
})

    }
}
