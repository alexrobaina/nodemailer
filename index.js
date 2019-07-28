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
            service: 'gmail',
            type: "service_account",
  project_id: "nodemailer-wedding",
  private_key_id: "2e1e4e5cf3c91e2e371af35a7022309b7533645f",
  private_key: "nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCdFs4Jqv4xQtZ4\n5FNqkZ5Mw7dtew1iF85lW7ZpfocBSyrF+ws5jq7Oe52m2GZcrn3neVkk4bGkwAJ1\n7vlnppxhzajC29vAPf0By8J27iNCil3Lp2H9O6EuMavhIo986bF8RB+m0djctDTS\nsx5YE3TkoKV2mu0FozlzwNlyqbe3HMZ6COAzulAio5iv86iD6XmWUJ7HrvtwcTNK\n7h9v8YqbrAPndH6XJighy9HC6OFAqMOoMI+i0LnWsLiM33V8AStxkLsRdjIy6Dlh\n/XerNUaf5qhSe2Fde/023trF03BieEwwdenYzfoB9bXfl8jMTU9imPx9zLYq3M6c\nCEVCBmzVAgMBAAECggEAS1dMqkZgc6/ivUiE2W/NxHN53gBOguV4EBTUf/Q3O9+Z\nPCsTTx+np1CSZBsVvQ3TRNlmb9HvKV0N0RI0fAnkpuPENPDNjH4uglX/hprgPmGu\naqZ00Mdwnn8kOG4i834Bqd/iblfm8rNbQlK2EvgB8EU8Fo5nb3TBcUrk/6F2g1OB\nPEeaAm36Gh6RB9BdCQrgtaOkF46n9Iuv7CyESVc+QyMnEcWKtafa0OUv2RVWsCBa\ntbHOUEsTJ6VM48fGxOybYfsF8d7mJhQIn/Ar8ukL4pN3wtp+Hg5THuySyw+7oHvG\n1xCqJeBj0GVGDf68zb6kU6P9gdYliYJTt3+NkHqZYQKBgQDQfP4+XH0Y2y+jM4Ou\n0v1x1UGag1L+aL12wZAtK+oa5CIgkXaX15g7rVUg+bCF3bGErnMIxgI51tJw7lMa\n5fxg8AgNEWSrry0bMT1Z5NbnD86h21iFS/ROMLB7BBIIQDAJlApeiwxKnmMT1SV3\n6gzi3kGC3l1yai1Up5fneJO65wKBgQDA4zuUJDBoiWLMD0nzGU2vhyoK4w7pha9m\nVewdOKm+miQ50tv7xIzxRTmiAnNTU+wlczhxzMROuA/kYIvggnG68fEgT2PAuVZE\nJPNc4u6CZGEL88MjBPvZIz5Syy7ABz9GK+YX/RJ3JwiUM3TE5Bz2PUDbPrZrskl2\nv09Kb2Z+4wKBgDFL3LHSHKIr8W+dVp2XteWcjw6BzrXo/iN+USDdKVWCa69Xtbrh\nd1Vk/qP1Zg/BA6Bjvz9r0krqyId7UpshljM1jjHI0wzlNr0fP2pp+YZY7nrG6n9a\nHkH+sTvlEn5w7urU3j7MkfNyz+p4k4tvA+0AsGzJNz8+a8mAdyJ8GDIxAoGAAvtA\nL4EDson1Gfxeg0Bv3/ex4asyzs8/L9DCLo1yqjyNtMsalWCrYQtV4bgx+ibA7q9C\nPxgQLLtRm5EWeGjrwxz8QiiX/SGgQLtle5kSYLeWfG3PJVptXiTaUMNNPLCf/MCu\n9M33nBnhWxEUi/qOrAu0Ve85OJ7v3cMFQbxJFEsCgYEAsnUZ9jRiZwuJ1MD1WWaL\nzIxGA4bUQqZOWa5IRA4+MKNoJX8SDVJTeEKcRyPmefn1g6VAL60P0xtcJ8Bjm+yq\nEeKYwUL2p4Z8APmZFUOStzOiarNghtzfBv1KPbKKPq1XjZTZQbhP7Cbia2lwb0OC\ncchr7ZRIYOIVUBSor+6jLTE=\n-----END PRIVATE KEY-----\n",
  client_email: "invitation-wedding@nodemailer-wedding.iam.gserviceaccount.com",
  client_id: "106949997016170773541",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/invitation-wedding%40nodemailer-wedding.iam.gserviceaccount.com",
            secure: true,
            "project_id": "nodemailer-wedding",
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