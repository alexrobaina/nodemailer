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
                accessToken: 'ya29.GltTB1J-kE0Nhicql4Y2dLag9Hpqa7cChZILGZ7g0ZoorNiJUkZ7TzBitSGEJML2c9BmHKiYHXuWBkzeA6seKieB0A3wz4JW4GiUTRrWoIYMoDQ9WJJO8sYZqHw-',
            }
        });

        transporter.set('oauth2_provision_cb', (user, renew, callback)=>{
            let accessToken = userTokens[user];
            if(!accessToken){
                return callback(new Error('Unknown user'));
            }else{
                return callback(null, accessToken);
            }
        });

        let mailOptions = {
            from: 'info.guacamayos@gmail.com',
            to: 'alexrobainaph@gmail.com',
            bcc: 'info.guacamayos@gmail.com',
            subject: 'Testing',
            text: `Hola Ale y Tati!
            Soy ${req.body.name}, muchas gracias por la invitación. 
            Quería confirmirarles mi asistencia a:
            ${req.body.civil}
            ${req.body.ceremonia}
            ${req.body.fiesta}

            Por cualquier cosa te puedes comunicar conmigo al siguiente email ${re.body.email}.

            Muchas gracias.
            `
        }
        
        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                console.log('Error Occurs');
                res.send('error hola mundo 3');
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