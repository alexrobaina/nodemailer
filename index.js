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

    console.log(req.body)
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'info.guacamayos@gmail.com',
                clientId: '361223958674-qkls4qokro669qrv8nh4sfs8ch75ai6a.apps.googleusercontent.com',
                clientSecret: 't_84TsL4cxE7CO7AfGasuxM3',
                refreshToken: '1/cyTlWvtPqfNLRM2cNwNvjoKPsZEkZHXaYRWn-UDAgh8',
                accessToken: 'ya29.GltUB_s3rImXwsE25Wg_shhRD5GmZ29kVUszpjHk4iZiEBmBUUU3GFunwiXcQ4E5P05tg2Z7IxsovIBswJ4YJ8w3QgwDWETLtYCcjfZKlnmaFEfYEDDXh3aalvqj',
                expires: 3600
            }
        });

        // transporter.set('oauth2_provision_cb', (user, renew, callback)=>{
        //     let accessToken = userTokens[user];
        //     if(!accessToken){
        //         return callback(new Error('Unknown user'));
        //     }else{
        //         return callback(null, accessToken);
        //     }
        // });

        let mailOptions = {
            from: 'info.guacamayos@gmail.com',
            to: 'lalimiramon@gmail.com',
            bcc: 'info.guacamayos@gmail.com',
            subject: 'Testing',
            text: `LO LOGREEEEEEEEEE mi amoooooooooor TE AMOOOOOOOO`
        }
        
        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                console.log('Error Occurs');
                res.send('error');
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