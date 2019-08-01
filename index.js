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
                clientId: '361223958674-u33j40r18i6nh3ajdje7ao4epoup5buo.apps.googleusercontent.com',
                clientSecret: 'jqyFW5tUqlZWgIMGYOtl-iB4',
                refreshToken: '1/zkHZgKOcPtKpejFVpWVGaFHYAaBAHJTjlpi-JzTYRkI',
                accessToken: 'ya29.GltVB3SL6-lKA2aDXstABfbmvoPzFnSqKE4qgqaKqIIay4VZoydcLC0ksHJESiWYYsyEP0vsFp0zsgcAMT79TkWHDHwiRB4juscL262f9-7_KiIpor6i-jT8OE7D',
                expires: 3600
            }
        });

        if (req.body.civil === 'civil' && req.body.ceremonia === '' && req.body.fiesta === '') {
            let mailOptions = {
                from: 'info.guacamayos@gmail.com',
                to: 'lalimiramon@gmail.com',
                bcc: 'info.guacamayos@gmail.com',
                subject: 'Testing',
                text: `Hola Ale y Tati gracias por la invitación mi nombre es ${req.body.name},
te confirmo mi asistencia a:
- ${req.body.civil}
    
Cualquier otra info que necesite saber este es mi email ${req.body.email}
`
            }
            return mailOptions;
        } else if (req.body.civil === '' && req.body.ceremonia === 'ceremonia' && req.body.fiesta === '') {
            let mailOptions = {
                from: 'info.guacamayos@gmail.com',
                to: 'lalimiramon@gmail.com',
                bcc: 'info.guacamayos@gmail.com',
                subject: 'Testing',
                text: `Hola Ale y Tati gracias por la invitación mi nombre es ${req.body.name},
te confirmo mi asistencia a:
- ${req.body.ceremonia}
    
Cualquier otra info que necesite saber este es mi email ${req.body.email}
`
            }
            return mailOptions;

        } else if (req.body.civil === '' && req.body.ceremonia === '' && req.body.fiesta === 'fiesta') {
            let mailOptions = {
                from: 'info.guacamayos@gmail.com',
                to: 'lalimiramon@gmail.com',
                bcc: 'info.guacamayos@gmail.com',
                subject: 'Testing',
                text: `Hola Ale y Tati gracias por la invitación mi nombre es ${req.body.name},
te confirmo mi asistencia a:
- ${req.body.fiesta}
    
Cualquier otra info que necesite saber este es mi email ${req.body.email}
`
            }
            return mailOptions

        } else if (req.body.civil === '' && req.body.ceremonia === 'ceremonia' && req.body.fiesta === 'fiesta') {
            let mailOptions = {
                from: 'info.guacamayos@gmail.com',
                to: 'lalimiramon@gmail.com',
                bcc: 'info.guacamayos@gmail.com',
                subject: 'Testing',
                text: `Hola Ale y Tati gracias por la invitación mi nombre es ${req.body.name},
te confirmo mi asistencia a:
- ${req.body.ceremonia}
- ${req.body.fiesta}
    
Cualquier otra info que necesite saber este es mi email ${req.body.email}
`
            }
            return mailOptions;

        } else if (req.body.civil === 'civil' && req.body.ceremonia === 'ceremonia' && req.body.fiesta === '') {
            let mailOptions = {
                from: 'info.guacamayos@gmail.com',
                to: 'lalimiramon@gmail.com',
                bcc: 'info.guacamayos@gmail.com',
                subject: 'Testing',
                text: `Hola Ale y Tati gracias por la invitación mi nombre es ${req.body.name},
te confirmo mi asistencia a:
- ${req.body.civil}
- ${req.body.ceremonia}
    
Cualquier otra info que necesite saber este es mi email ${req.body.email}
`
            }
            return mailOptions;

        } else if (req.body.civil === 'civil' && req.body.ceremonia === '' && req.body.fiesta === 'fiesta') {
            let mailOptions = {
                from: 'info.guacamayos@gmail.com',
                to: 'lalimiramon@gmail.com',
                bcc: 'info.guacamayos@gmail.com',
                subject: 'Testing',
                text: `Hola Ale y Tati gracias por la invitación mi nombre es ${req.body.name},
te confirmo mi asistencia a:
- ${req.body.civil}
- ${req.body.fiesta}
    
Cualquier otra info que necesite saber este es mi email ${req.body.email}
`
            }
            return mailOptions;
        } else {
            else if (req.body.civil === '' && req.body.ceremonia === '' && req.body.fiesta === '') {
                let mailOptions = {
                    from: 'info.guacamayos@gmail.com',
                    to: 'lalimiramon@gmail.com',
                    bcc: 'info.guacamayos@gmail.com',
                    subject: 'Testing',
                    text: `Hola Ale y Tati gracias por la invitación mi nombre es ${req.body.name},
no se si voy a ir. 
        
Cualquier otra info que necesite saber este es mi email ${req.body.email}`
                }
                return mailOptions;
            }
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