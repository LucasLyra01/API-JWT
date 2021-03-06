const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

const port = 5000;
const hostname = "localhost";

const routerTokens = require('./routes/index');

app.use(cors());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

// app.use(cors());

// app.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Origin: https://www.google.com/");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested, Content-Type, Accept Authorization"
//   )
//   if (req.method === "GET") {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE")

//     res.status(200);

//     // return next();
//   }
//   // return res.status(201).json({})
//   res.status(201);
//   next();

// });

// modo de usar
// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS#exemplos_de_cen%C3%A1rios_com_controle_de_acesso
// Access-Control-Allow-Origin: http://foo.example
// Access-Control-Allow-Origin: http://foo.example
// Access-Control-Allow-Origin: http://foo.example
// Access-Control-Allow-Origin: http://foo.example
// Access-Control-Allow-Origin: http://foo.example

app.use('/tokens', routerTokens);

// app.post('/login', (req, res) => {
//     if(req.body.user === 'lucas.lyra' && req.body.password === '123'){
//         const token = jwt.sign({ userID: req.body.user }, req.body.password, { expiresIn: 300 });
//         res.json({
//             auth: true,
//             token: token
//         });
//     }else{
//         res.json({
//             status: 'error',
//             message: 'Login incorreto'
//         })
//     }
// })

app.listen(port, hostname, () => {
  console.log(`Endereço rodando em: hhtp://${hostname}:${port}`);
})