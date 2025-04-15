import knex from 'knex';
import config from '../database/knexfile.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const db = knex(config.development);


export async function registerUser(req,res) {
    const {name, birthday, email, password} = req.body;

    try {
        const existingUser = await db('user').where({email}).first();
        if (existingUser){
            return res.status(400).json({message: `Email já cadastrado`}); 
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        await db(`user`).insert({
            name,
            birthday,
            email, 
            password: hashedPassword,
            is_admin: false,
            avatar: null
        })

        res.status(201).json({message: `Usuário registrado com sucesso`})


    } catch (err) {
        console.error(err);
        res.status(500).json({message: `Erro no servidor`});
    }
}

export async function loginUser(req,res) {
    const {email, password} = req.body;

    try {
        const user = await db(`user`).where({email}).first();
        if (!user) {
            return res.status(400).json({message: `Usuário não encontrado`});
        };
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch){
            return res.status(401).json({message: `Senha incorreta`});
        };

        

        const token = jwt.sign(
            {
                id: user.id,
                is_admin: user.is_admin
            },  
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
            
        );

        res.status(200).json({
        message: `Login bem sucedido`,
        token
    });

    } catch (err) {
        console.error(err);
        res.status(500).json({message: `Erro no servidor`});
    };
}

export async function getUserProfile(req, res) {
    const tokenID = req.user.id;


    try {
        const user = await db('user')
        .where({id: tokenID})
        .select('id','name','email','birthday','avatar','is_admin')
        .first();
        
        res.status(200).json({user});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: `Erro ao buscar informações do usuário`})
        
    }
}

export async function adminGetUser (req,res) {
    const is_admin = req.user.is_admin;
    const getUser = req.params.id
    
    if (is_admin === 1){
        try {
            const user = await db('user')
            .where({id: getUser})
            .select('id','name','email','birthday','avatar','is_admin')
            .first();
            
            if(!user){
                return res.status(404).json({message: `Usuário nao foi encontrado`})
            }
            res.status(200).json({user})
            
        } catch (err) {
            console.error(err);
            res.status(500).json({message: `Não foi possivel encontrar os dados do usuário`});
        }  
    } else{
        res.status(403).json({message: `Você não tem a permissão necessária para acessar esses dados`})

    }
    
}

export async function adminGetAllUsers (req, res){
    const users = await db(`user`).select(`*`);
    try {
        res.status(200).json({users})
    } catch (err) {
        console.error(err);
        res.status(500).json({message: `Erro ao buscar os usuários`})
    }
}





    


