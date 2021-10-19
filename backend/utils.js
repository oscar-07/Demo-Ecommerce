import jwt from "jsonwebtoken";

/*MIDDLEWARE*/


export const generateToken = (usuario) =>{
    return jwt.sign({
        _id: usuario._id,
        name: usuario.name,
        email: usuario.email,
        isAdmin: usuario.isAdmin,
    },
     process.env.JWT_SECRET || 'somethingsecret', 
    {
    expiresIn: '30d',
    }
    );
};

export const isAuth = (req, res, next) =>{
    const authorization = req.headers.authorization;             //
    if(authorization){
        const token = authorization.slice(7, authorization.length);  //Bearer xxxxxx  solo tomara a partir de la septima osea xxxxx
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingsecret',
            (err,decode) => {
            if(err){                                //mi palabra en frontend
                res.status(401).send({message: 'Token  invalido'});
            }else{
                req.user = decode;
                next();
            }
        }); 
    }else{
        res.status(401).send({message: 'No token'});
    }
}
export const isAdmin = (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).send({message: 'error de admin token'})
    }
}