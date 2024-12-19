// TODO: Implement the sport controller

import { Request, Response } from "express";
import { Sport, User } from "../models";

export const sportController = {

    getSports: async (req : Request, res: Response) => {
        try{
            let sports = await Sport.find();
            res.status(200).json({sports});
        } catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    },

    getSportById: async (req : Request, res: Response) => {
        try{
            let sport = await Sport.findById(req.params.id);
            res.status(200).json({sport});
        } catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    },

    createSport: async (req : Request, res: Response) => {
        try{
            let sport = await Sport.create(req.body);
            res.status(201).json({sport});
        } catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    },

    updateSport: async (req : Request, res: Response) => {
        try{
            let sport = await Sport.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json({sport});
        } catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    },

    deleteSport: async (req : Request, res: Response) => {
        try{
            await Sport.findByIdAndDelete(req.params.id);
            res.status(204).json();
        } catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    },

    
} 