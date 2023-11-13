import dotenv from "dotenv";
dotenv.config();
import { google } from 'googleapis';
import express from 'express';
import fs from "fs";
import cors from 'cors';
import credentials from './credentials.json' assert { type: 'json' };
import { OAuth2Client } from 'google-auth-library';
import { createProxyMiddleware } from 'http-proxy-middleware';


const app = express();
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

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

const PORT = process.env.PORT || 3000;

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

app.use('src/pages/testApi', createProxyMiddleware({
  target: 'http://localhost:3000',  // Altere para o endereço do seu servidor backend
  changeOrigin: true,
}));

// Rota para listar o conteúdo de uma pasta no Google Drive
app.get('/listarPasta', async (req, res) => {
  try {
    const { pastaCliente } = req.query; // Obter o nome da pasta a partir dos parâmetros de consulta (query parameters)

    if (!pastaCliente) {
      res.status(400).send('O nome da pasta não foi fornecido.');
      return;
    }

    const pastaId = await pastaNome(pastaCliente, oauth2Client);

    if (!pastaId) {
      res.status(404).send('Pasta não encontrada no Google Drive.');
      return;
    }

    const arquivos = await listarArquivos(pastaId, oauth2Client);

    res.json(arquivos);
  } catch (error) {
    console.error('Erro ao listar o conteúdo da pasta no Google Drive:', error);
    res.status(500).send('Erro ao listar o conteúdo da pasta no Google Drive.');
  }
});

// Função para obter o ID de uma pasta por nome
async function pastaNome(nomePasta, oauth2Client) {
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  try {
    const response = await drive.files.list({
      q: `name='${nomePasta}' and mimeType='application/vnd.google-apps.folder'`,
      fields: 'files(id)',
    });

    if (response.data.files.length > 0) {
      return response.data.files[0].id;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Erro ao obter o ID da pasta no Google Drive:', err.message);
    return null;
  }
}

// Função para listar arquivos dentro de uma pasta
async function listarArquivos(pastaId, oauth2Client) {
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  try {
    const response = await drive.files.list({
      q: `'${pastaId}' in parents`,
      fields: 'files(id, name, mimeType)',
    });

    return response.data.files;
  } catch (err) {
    console.error('Erro ao listar arquivos na pasta no Google Drive:', err.message);
    return [];
  }
}



app.get('/download/:fileId/:nomeDocumento', (req, res) => {
  const fileId = req.params.fileId; // Obtém o ID do arquivo a ser baixado
  const nomeDocumento = req.params.nomeDocumento; // Obtém o nome do arquivo a ser baixado

  // Crie uma instância da biblioteca googleapis para interagir com a API do Google Drive
  const drive = google.drive({ version: 'v3', auth: oauth2Client }); // Certifique-se de que 'oauth2Client' esteja configurado corretamente

  // Use a função files.get para obter informações sobre o arquivo, incluindo o seu conteúdo
  drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' }, (err, response) => {
    if (err) {
      console.error('Erro ao obter o arquivo do Google Drive:', err);
      res.status(500).send('Erro ao obter o arquivo do Google Drive.');
      return;
    }

    // Verifique se a resposta possui dados
    if (!response.data) {
      console.error('Nenhum dado encontrado.');
      res.status(404).send('Nenhum dado encontrado.');
      return;
    }

    // Determine o tipo de conteúdo com base na extensão do nome do arquivo
    const extensao = nomeDocumento.split('.').pop();
    let tipoConteudo = 'application/octet-stream'; // Tipo de conteúdo padrão

    // Mapeie extensões comuns para tipos de conteúdo
    const tiposDeConteudoPorExtensao = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
    };
if (extensao in tiposDeConteudoPorExtensao) {
      tipoConteudo = tiposDeConteudoPorExtensao[extensao];
    }

    // Configurar o cabeçalho de resposta para o tipo de conteúdo do arquivo
    res.setHeader('Content-Type', tipoConteudo);

    // Configurar o cabeçalho de resposta para permitir o download do arquivo com o nome desejado
    res.setHeader('Content-Disposition', `attachment; filename="${nomeDocumento}"`);

    // Enviar o conteúdo do arquivo como resposta
    response.data
      .pipe(res)
      .on('finish', () => {
        console.log(`Arquivo ${nomeDocumento} enviado com sucesso.`);
      })
      .on('error', (err) => {
        console.error('Erro ao enviar o arquivo:', err);
        res.status(500).send('Erro ao enviar o arquivo.');
      });
  });
});

  
app.listen(PORT, () => {
    console.log("Server started on port 3000");
});