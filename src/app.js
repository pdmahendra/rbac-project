import express, { urlencoded } from 'express'
const app = express();
import cookieParser from 'cookie-parser';


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser())

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });

app.get('/', (req, res) => {
res.render('index')
})

import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'

app.use('/auth', authRoute)
app.use('/user', userRoute)

export { app }


