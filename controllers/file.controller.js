import {table1, table2, table3, table4 } from "../index.js";
import { db } from "../knexfile.js";

export const getFiles = async (req, res) => {
    console.log(`entrei na rota`);
    try{
        const show_data = await db(table3).select(`*`);
        console.log(show_data);
        res.status(200).json(show_data);
    }catch(error){
        res.status(500).send(`Server Error`)
    }
}
export const getFile = async (req, res) => {
    console.log(`entrei na rota`);
    try{
        const show_data = await db(table3).select(`*`);
        console.log(show_data);
        res.status(200).json(show_data);
    }catch(error){
        res.status(500).send(`Server Error`)
    }
}

export const getFilesByUserId =  async (req, res) => {
    const {id} = req.params;
    console.log(`Entrei na rota localhost:3000/user/files/${id}`);
    const files = await db(table3).select('*').where({user_id: id})
    res.status(200).json(files);
}

export const postFile = async (req, res) => {
    console.log(`entrei na rota`);
    try{
        const {name, user_id} = req.body
        const newFile = await db(table3).insert({
            name,
            user_id
        });
        console.log(newFile);
        res.status(201).json(newFile);
    }catch(error){
        res.status(500).send(`Server Error`)
    }
}