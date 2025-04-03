import {table1, table2, table3, table4 } from "../index.js";
import { db } from "../knexfile.js";


// CONTROLLERS DE USUARIO
export const getUsers = async (req, res) => {
    console.log(`entrei na rota`);
    try{
        const show_data = await db(table1).select(`*`);
        console.log(show_data);
        res.status(200).json(show_data);
    }catch(error){
        res.status(500).send(`Server Error`)
    }
};

export const getUser = async (req, res) => {
    console.log(`entrei na rota`);
    try{
        const show_data = await db(table1).select(`*`);
        console.log(show_data);
        res.status(200).json(show_data);
    }catch(error){
        res.status(500).send(`Server Error`)
    }
};
//----------------------------------------------------------

// CONTROLLERS DE POSTS

export const postUser = async (req, res) => {
    
}



