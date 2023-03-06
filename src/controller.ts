import fs from "fs";
import { UserInerface } from "./interface";
import data from "./store.json"

export const getUsers = async (req: any, res: any) => {
    let result: UserInerface[] = data
    res.json(result)
}

export const getUserById = async (req: any, res: any) => {
    try {
        const result = data.filter(user => user.id == req.params.id);
        if (result.length > 0) {
            res.json(result)
        } else {
            res.json({ message : "user not found"})
        }
    } catch (err) {
        throw err;
    }
}

export const createUser = async (req: any, res: any) => {
    try {
        const user = req.body;
        user.id = data.length + 1
        data.push(user)
        await fs.writeFileSync('./store.json', JSON.stringify(data))
        res.json({ message : "user created successfully"})
    } catch (err) {
        throw err;
    }
}

export const deleteUser = async (req: any, res: any) => {
    try {
        let result = data.filter(user => user.id == req.params.id);
        if (result.length > 0) {
            result = data.filter(user => user.id != req.params.id)
            await fs.writeFileSync('./store.json', JSON.stringify(data))
            res.json({ message : "user deleted successfully"})
        } else {
            res.json({ message : "user not found"})
        }
    } catch (err) {
        throw err;
    }
}