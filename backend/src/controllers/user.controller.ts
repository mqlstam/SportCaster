import { Request, Response } from "express";
import { Sport, User } from "../models";
import { get } from "http";

export const userController = {

    getUsers: async (req : Request, res: Response) => {
        try{
            let users = await User.find();
            res.status(200).json({users});
        } catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    },

    getUserById: async (req : Request, res: Response) => {
        try{
            let user = await User.findById(req.params.id);
            res.status(200).json({user});
        } catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    },

    createUser: async (req : Request, res: Response) => {
        try{
            let user = await User.create(req.body);
            res.status(201).json({user});
        } catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    },

    updateUser: async (req : Request, res: Response) => {
        try{
            let user = await User.findByIdAndUpdate (req.params.id, req.body, {new: true});
            res.status(200).json({user});
        } catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    },

    deleteUser: async (req : Request, res: Response) => {
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(204).json();
        } catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    },

}