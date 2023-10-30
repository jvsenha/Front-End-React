import dotenv from "dotenv";
dotenv.config();
import { google } from 'googleapis';
import express from 'express';
import fs from "fs";
import multer from 'multer';
import cors from 'cors';
import { Readable } from 'stream';
import credentials from '../credentials.json' assert { type: 'json' };
import { OAuth2Client } from 'google-auth-library';
import bodyParser from 'body-parser';

const app = express();


const corsOptions = {
    origin: '*', // A origem permitida (substitua pelo seu próprio domínio)
    methods: 'GET,POST', // Métodos permitidos
  };
  app.use(cors(corsOptions));

  const oauth2Client = new OAuth2Client({
    clientId: credentials.web.client_id,
    clientSecret: credentials.web.client_secret,
    redirectUri: credentials.web.redirect_uris[0],
  });

try {
    const creds = fs.readFileSync("creds.json");
    oauth2Client.setCredentials(JSON.parse(creds));
} catch (err) {
    console.log("No creds found");
}

const PORT = process.env.PORT || 8000;

app.get("/auth/google", (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/drive"
        ],
    });
    res.redirect(url);
});

app.get("/google/redirect", async (req, res) => {
    try {
        const { code } = req.query;
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        fs.writeFileSync("creds.json", JSON.stringify(tokens));
        res.send("Sucess");
    } catch (error) {
        console.error("Erro ao obter tokens de acesso:", error);
        res.status(500).send("Erro ao obter tokens de acesso.");
    }
});

//const TOKEN_PATH = 'creds.json'; //Path para armazenar o token de acesso


/*async function autenticar() {
  const credentials = require('../credentials.json');  //Substitua pelo caminho correto das suas credenciais
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Verificar se já tem um token de acesso
  try {
    const token = fs.readFileSync(TOKEN_PATH);
    oauth2Client.setCredentials(JSON.parse(token));
    return oauth2Client;
  } catch (err) {
    return getNovoToken(oauth2Client);
  }
}*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function criarPastaNoDrive(pastaCliente, oauth2Client) {
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  const fileMetadata = {
      name: pastaCliente,
      mimeType: 'application/vnd.google-apps.folder',
  };

  try {
      const response = await drive.files.create({
          resource: fileMetadata,
          fields: 'id',
      });
      return response.data.id;
  } catch (err) {
      console.error('Erro ao criar a pasta no Google Drive:', err.message);
      return null;
  }
}

// Rota para criar a pasta no Google Drive
app.post('/cadastrarPastaNoDrive', async (req, res) => {
  try {
    const { pastaCliente } = req.body;

    if (!pastaCliente) {
      res.status(400).send('O nome da pasta não foi fornecido.');
      return;
    }

    const pastaId = await criarPastaNoDrive(pastaCliente, oauth2Client);

    if (pastaId) {
      res.send(pastaId);
    } else {
      res.status(500).send('Erro ao criar a pasta no Google Drive.');
    }
  } catch (error) {
    console.error('Erro ao criar a pasta no Google Drive:', error);
    res.status(500).send('Erro ao criar a pasta no Google Drive.');
  }
});




const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post('/upload/:pastaCliente', upload.single('file'), async (req, res) => {
    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    const folderName = req.params.pastaCliente;// Substitua 'YOUR_FOLDER_NAME' pelo nome da pasta de destino
    
  try {
    // Pesquise a pasta pelo nome
    const folderQuery = `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`;
    console.log(folderName)
    const folders = await drive.files.list({
      q: folderQuery,
      fields: 'files(id)',
    });

    if (folders.data.files.length > 0) {
      const folderId = folders.data.files[0].id;

      const fileMetadata = {
        name: req.file.originalname,
        parents: [folderId], // Use o ID da pasta encontrada
      };

      // Crie um stream legível a partir do Buffer
      const readableStream = new Readable();
      readableStream.push(req.file.buffer);
      readableStream.push(null);

      const media = {
        mimeType: req.file.mimetype,
        body: readableStream, // Passe o stream para a API do Google Drive
      };

      const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id,name,size,webViewLink', // Solicitar informações adicionais
      });

      const fileId = response.data.id;
      const fileName = response.data.name;
      const fileSize = response.data.size;
      const webViewLink = response.data.webViewLink;

      res.json({
        message: 'Arquivo carregado com sucesso',
        fileId,
        fileName,
        fileSize,
        webViewLink,
      });

      console.log(fileId);
      console.log(fileName);
      console.log(fileSize);
      console.log(webViewLink);

    } else {
      console.error('Pasta não encontrada.');
      res.status(500).send('Pasta não encontrada.');
    }
  } catch (error) {
    console.error('Erro ao carregar o arquivo:', error);
    res.status(500).send('Erro ao carregar o arquivo.');
  }
});



  
app.listen(PORT, () => {
    console.log("Server started on port 8000");
});