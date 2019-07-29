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
                refreshToken: '1/fSiZS0RVCgxGV6Ct86w0KoOiIPmsdlnzXOOvB-8C6m8',
                accessToken: 'ya29.GltUB7v26p8ojZQAiUzADG2g8GvqQCp6br4GJs6MTTVyvoNYDrNJv1eu6_l6AuwlDbiyvt_BjfDU_hf7MPOTYhheZA20UrRZ1OueGZB84uCF0bqgemfb0sPBaiQ9',
                expires: 3600
            }
        });

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