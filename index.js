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
                clientId: '361223958674-3d07mbqfuhf44tp0b550244mtb8ctr3n.apps.googleusercontent.com',
                clientSecret: 'JtThfUvmsr2cfA3Qpch_j4gg',
                refreshToken: '1/fSiZS0RVCgxGV6Ct86w0KoOiIPmsdlnzXOOvB-8C6m8',
                accessToken: 'ya29.GltUB8ThaFt7RAeMJDFgrZckvFFlEPMo6kvDiGqmFbhGxxmLO49Yk47V-8FCShPZjetHpfJnzInuhQyNGIWJIAfZn_hOvDHMtlQzn8W2bhLujpEQtWBs7GWqppGL',
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