import db from '../db.js';

export async function createFile(req,res) {
    const {name} = req.body;
    const user_id = req.user.id;
    
    try {
        const [id] = await db('file').insert({name, user_id});
        res.status(201).json({id, name});
    } catch (err) {
        console.error(err);
        res.status(500).json({Message: 'Erro ao criar arquivo' });
        
    }
    
}

export async function listFiles(req,res) {
   
    
    try {
        const userId = req.user.id;

        const files = await db('file')
        .where({user_id: userId})
        .select('id','name');
        res.status(200).json({files});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Erro ao buscar arquivos'});
    }   
}
    
    
export async function getFile(req,res) {
    const {id} = req.params;
    const user_id = req.user.id;
    
    try{
        const file = await db('file').where({id, user_id});
        if(!file)  return res.status(404).json({message: `Arquivo não encontrado`});
        res.status(200).json(file); 
    }catch(err){
        console.error(err);
        res.status(500).json({message: `Erro ao buscar arquivo`});
        
    }
}

export async function deleteFile(req,res){
    const {id} = req.params;
    const user_id = req.user.id;
    
    try {
        const deleted = await db('file').where({id, user_id}).del();
        if (!deleted) return res.status(404).json({message: `Não é possível apagar um arquivo que não existe`});
        res.status(200).json({message: `Arquivo deletado`}); 
        
    }catch(err){
        console.error(err);
        res.status(500).json({message: `Erro ao deletar arquivo`});
        
    }
    
}