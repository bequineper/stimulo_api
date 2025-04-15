import jwt from 'jsonwebtoken';

export function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message: `Token não fornecido`});
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({message: `Token inválido`});
        }
        
        req.user = user;
        next();
    });
    
}

export function isAdmin(req,res,next) {
    if (!req.user || !req.user.is_admin) {
        res.status(500).json({message: `Permissão negada, apenas admins`})
    } else if(req.user.is_admin == 1){
        next();
    };
       
}