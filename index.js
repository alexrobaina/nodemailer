require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  
    // OPTIONS only happens when the browser sends POST or PUT
    if (req.method === 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      );
      return res.status(200).json({});
    }
  
    next();
  });


app.post('/api/form', (req, res) => {

        let transporter = nodemailer.createTransport({
            // service: 'gmail',
            // type: 'service_account',
            // clientId: '361223958674-qkls4qokro669qrv8nh4sfs8ch75ai6a.apps.googleusercontent.com',
            // clientSecret: 't_84TsL4cxE7CO7AfGasuxM3',
            type: 'OAuth2',
            user: 'info.guacamayos@gmail.com.com',
            refreshToken: '1/HrapCZx5UTOny59wacUh9q5xNEMqvRrnukahB8OsWi6CoYX9vMiG45Fq2dXSxun9',
            accessToken: 'ya29.GltTB4Lr3DInLbXvQFl_bOj_MF9wDjTP6-nNr6TLCw8PcXD62NVe11ezL8Dj3jgTXjecR1UlvITcJ5XVZVDTo-uuDV3kDLvZo8FjcAgUEiLWMQtK8NUnkhyivM2B',
            expires: 3600,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailOptions = {
            from: 'info.guacamayos@gmail.com',
            to: 'alexrobainaph@gmail.com',
            bcc: 'info.guacamayos@gmail.com',
            subject: 'Testing',
            text: `OTRA ULTIMA PRUEBA`
        }
        
        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                console.log('Error Occurs');
                res.send('error hola mundo');
            } else {
                console.log('Email sent!!!!');
                res.send('ok');
            } 
        });

    });


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`) 
})