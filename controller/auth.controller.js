import jwt from 'jsonwebtoken';
import { registerUserSchema } from '../validators/auth-validtors.js'
import * as authModel from '../models/authModel.js';
import argon2 from 'argon2';

export const getLogout = async(req, res) =>{
    console.log('logout', req.user)
    await authModel.clearUserSession(req.user.sessionId);
    res.clearCookie("access-token");
    res.clearCookie("refresh-token");
    return res.json({message: "success: true, logged out"})
}
export const postRegistration = async (req, res) => {
    const result = registerUserSchema.safeParse(req.body);
    if (!result.success) {
        throw result.error;
    }
    const data = result.data;
    await authModel.getUserByEmail(data.email);
    const hashedPassword = await argon2.hash(data.password);
    const createUser = await authModel.createNewUser({name: data.name, email: data.email, password: hashedPassword});
    return res.status(200).json({success: true, userId: createUser});
}

export const postLogin = async (req, res) => {
    const {email, password} = req.body;
    const users = await authModel.getUserByEmail(email);
    if(!users){
        res.status(404).json({success: false, message: 'users doesnt exits'})
    }
    console.log(users, password);
    const verifyPassword = await argon2.verify(users.password, password)
    if(!verifyPassword){
        return res.status(401).json({success: false, message: 'wrong id and password'})
    }
    //just access token
    //const generateToken = jwt.sign({id: users.id, name: users.name,
    //email: users.email}, process.env.JWT_SECRET, {expiresIn: '30d'})
//     res.cookie("access-token", generateToken, { httpOnly: true ,   secure: false, // localhost testing
//   sameSite: "strict",
// });
//first create session
    const sessionId = await authModel.createSession(users.id, {
        ip: req.clientIp,
        userAgent: req.headers["user-agent"]
    })
    const accessToken = jwt.sign({
        id: users.id,
        name: users.name,
        email: users.email,
        sessionId: sessionId
    }, process.env.JWT_SECRET, {expiresIn: '20m'});
    const refreshToken = jwt.sign({sessionId: sessionId}, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'});
    const baseConfig = { httpOnly: true ,   secure: true, sameSite: "strict",}
    res.cookie("access-token", accessToken, {...baseConfig, maxAge: 20*60*1000});
    res.cookie("refresh-token", refreshToken, {...baseConfig, maxAge: 7*24*60*60*1000});
    return res.status(200).json({success: true, isRegistered: true})
}