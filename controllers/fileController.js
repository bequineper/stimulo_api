import db from '../db.js';
import { encrypt, decrypt } from '../utils/cryptoUtils.js';

export async function createFile(req, res) {
    const { content } = req.body;
    const user_id = req.user.id;

    try {
        const encryptedContent = encrypt(content);

        const [id] = await db('file').insert({
            name: '', 
            user_id,
            content: encryptedContent
        });

        const name = `File_${id}`;

        await db('file').where({ id }).update({ name });

        res.status(201).json({ id, name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ Message: 'Erro ao criar arquivo' });
    }
}


export async function listFiles(req,res) {
   
    
    try {
        const userId = req.user.id;

        const files = await db('file')
        .where({user_id: userId})
        .select('id','name','content');
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
        
        
        

        const file = await db('file')
        .where({id, user_id})
        .select('id','name','content')
        .first();
        
        console.log(file);
        if(!file)  return res.status(404).json({message: `Arquivo não encontrado`});
        

        const decryptedContent = decrypt(file.content);
        res.status(200).json({...file, content: decryptedContent}); 

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

export async function updateFileContent(req,res) {
    const { id } = req.params;
    const { content} = req.body;
    const user_id = req.user.id;

    try {
        const encryptedContent = encrypt(content);

        const updated = await db('file')
        .where({id, user_id})
        .update({content: encryptedContent});

        
        if(!updated){
            return res.status(404).json({message: `Arquivo não encontrado`});

        }

        res.status(200).json({message: `Conteúdo atualizado com sucesso`});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: `Erro ao atualizar conteúdo`});
    }
}

export async function updateFileName(req,res){
    const {id} = req.params;
    const user_id = req.user.id;
    const {name} = req.body;


    if (!name.endsWith('.md')) {
        name += '.md';
      }

    try {
        const updated = await db('file')
        .where({id, user_id})
        .update({name});

        if(!updated){
            return res.status(404).json({message: `Arquivo não encontrado`});
        }

        res.status(200).json({message: 'Nome do arquivo atualizado com sucesso'});
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message: `Impossivel atualizar o nome do arquivo`});
        
    }




    
}


