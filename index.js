import express from 'express'
import { appcode } from './app.js';
import { connectDB } from './models/connection.js';
const app=express();
appcode(app,express)
connectDB()