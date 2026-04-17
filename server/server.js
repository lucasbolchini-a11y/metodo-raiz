// ========================================
// Metodo Raiz - Backend
// Recibe datos del formulario y manda mails
// Soporta español e ingles
// ========================================

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middlewares ----------
// CORS abierto — acepta requests desde cualquier origen (Vercel, local, etc.)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.options('*', cors()); // responde el preflight de cualquier ruta
app.use(express.json());

// ---------- Validacion de variables de entorno ----------
const missingEnvVars = ['GMAIL_USER', 'GMAIL_APP_PASSWORD', 'MAIL_DESTINO'].filter(
  (key) => !process.env[key]
);
if (missingEnvVars.length > 0) {
  console.error('⚠️  FALTA CONFIGURAR EN RENDER > Environment:', missingEnvVars.join(', '));
}

// ---------- Configuracion de Gmail ----------
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// ---------- Registro de reservas ----------
const RESERVAS_FILE = path.join(__dirname, 'reservas.json');

function cargarReservas() {
  try {
    if (fs.existsSync(RESERVAS_FILE)) {
      const data = fs.readFileSync(RESERVAS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error al leer reservas.json:', error.message);
  }
  return [];
}

function guardarReserva(email) {
  const reservas = cargarReservas();
  reservas.push({ email: email.toLowerCase(), fecha: new Date().toISOString() });
  fs.writeFileSync(RESERVAS_FILE, JSON.stringify(reservas, null, 2));
}

function yaReservo(email) {
  const reservas = cargarReservas();
  return reservas.some(r => r.email === email.toLowerCase());
}

// ---------- Traducciones de mails ----------
const mailTexts = {
  es: {
    subjectClient: (nombre) => `${nombre}, tu clase de prueba esta reservada`,
    greeting: (nombre) => `Hola ${nombre}, tu clase esta reservada.`,
    summary: 'Aca va un resumen de tu reserva:',
    classLabel: 'Clase',
    classValue: 'Funcional para principiantes',
    timeLabel: 'Horario',
    costLabel: 'Costo',
    costValue: 'Gratis',
    locationLabel: 'Ubicacion',
    locationValue: 'Brickell, Miami',
    whatToBring: '<strong>Que traer:</strong> ropa comoda, zapatillas deportivas y una botella de agua. Nosotros ponemos todo lo demas.',
    confirmMsg: (tel) => `En las proximas horas te confirmamos el dia y hora exactos por WhatsApp al <strong>${tel}</strong>.`,
    doubtMsg: 'Si tenes alguna duda antes, escribinos directo:',
    waButton: 'Escribir por WhatsApp',
    closing: 'Nos vemos pronto,',
    signature: 'Mateo — Metodo Raiz',
    subjectTrainer: (nombre, horario) => `Nueva reserva: ${nombre} - ${horario}`,
    trainerHeader: 'Nueva reserva de clase de prueba',
    labelName: 'Nombre',
    labelEmail: 'Email',
    labelPhone: 'Telefono',
    labelTime: 'Horario preferido',
    labelLevel: 'Nivel de experiencia',
    labelNotSpecified: 'No especificado',
    receivedAt: 'Recibido el',
  },
  en: {
    subjectClient: (nombre) => `${nombre}, your trial class is booked`,
    greeting: (nombre) => `Hi ${nombre}, your class is booked.`,
    summary: 'Here\'s a summary of your booking:',
    classLabel: 'Class',
    classValue: 'Functional for beginners',
    timeLabel: 'Time',
    costLabel: 'Cost',
    costValue: 'Free',
    locationLabel: 'Location',
    locationValue: 'Brickell, Miami',
    whatToBring: '<strong>What to bring:</strong> comfortable clothes, sneakers, and a water bottle. We provide everything else.',
    confirmMsg: (tel) => `In the next few hours we'll confirm the exact day and time via WhatsApp at <strong>${tel}</strong>.`,
    doubtMsg: 'If you have any questions, reach out directly:',
    waButton: 'Message on WhatsApp',
    closing: 'See you soon,',
    signature: 'Mateo — Método Raíz',
    subjectTrainer: (nombre, horario) => `New booking: ${nombre} - ${horario}`,
    trainerHeader: 'New trial class booking',
    labelName: 'Name',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    labelTime: 'Preferred time',
    labelLevel: 'Experience level',
    labelNotSpecified: 'Not specified',
    receivedAt: 'Received on',
  }
};

// ---------- Ruta de prueba ----------
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Servidor Metodo Raiz funcionando',
    env: {
      gmail_user: process.env.GMAIL_USER ? '✓ configurado' : '✗ FALTA',
      gmail_pass: process.env.GMAIL_APP_PASSWORD ? '✓ configurado' : '✗ FALTA',
      mail_destino: process.env.MAIL_DESTINO ? '✓ configurado' : '✗ FALTA'
    }
  });
});

// ---------- Ruta del formulario ----------
app.post('/api/reservar', async (req, res) => {
  console.log('Nueva reserva recibida:', req.body);

  const { nombre, email, telefono, horario, nivel, idioma } = req.body;
  const lang = (idioma === 'en') ? 'en' : 'es';
  const t = mailTexts[lang];

  if (!nombre || !email || !telefono || !horario) {
    return res.status(400).json({ ok: false, error: 'Faltan datos obligatorios' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ ok: false, error: 'Email invalido' });
  }

  if (yaReservo(email)) {
    console.log('Reserva duplicada rechazada:', email);
    return res.status(409).json({
      ok: false,
      error: 'duplicado',
      message: lang === 'en'
        ? 'You already booked a trial class with this email.'
        : 'Ya reservaste tu clase de prueba con este mail. Te contactamos pronto.'
    });
  }

  try {
    const tTrainer = mailTexts.es; // Mail al entrenador siempre en español

    const mailAlEntrenador = {
      from: `"Metodo Raiz Web" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_DESTINO,
      replyTo: email,
      subject: tTrainer.subjectTrainer(nombre, horario),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px; margin: 0 auto; color: #1f2a24;">
          <div style="background: #3f5a46; color: #f5f1ea; padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="margin: 0; font-weight: 500;">${tTrainer.trainerHeader}</h2>
          </div>
          <div style="background: #f5f1ea; padding: 28px; border-radius: 0 0 12px 12px;">
            <p style="margin: 0 0 8px; color: #8a8f88; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">${tTrainer.labelName}</p>
            <p style="margin: 0 0 20px; font-size: 18px;"><strong>${nombre}</strong></p>
            <p style="margin: 0 0 8px; color: #8a8f88; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">${tTrainer.labelEmail}</p>
            <p style="margin: 0 0 20px;"><a href="mailto:${email}" style="color: #3f5a46;">${email}</a></p>
            <p style="margin: 0 0 8px; color: #8a8f88; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">${tTrainer.labelPhone}</p>
            <p style="margin: 0 0 20px;"><a href="https://wa.me/${telefono.replace(/[^0-9]/g, '')}" style="color: #3f5a46;">${telefono}</a></p>
            <p style="margin: 0 0 8px; color: #8a8f88; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">${tTrainer.labelTime}</p>
            <p style="margin: 0 0 20px;">${horario}</p>
            <p style="margin: 0 0 8px; color: #8a8f88; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">${tTrainer.labelLevel}</p>
            <p style="margin: 0 0 20px;">${nivel || tTrainer.labelNotSpecified}</p>
            <p style="margin: 24px 0 0; font-size: 12px; color: #8a8f88; border-top: 1px solid #dcd4c6; padding-top: 16px;">
              ${tTrainer.receivedAt} ${new Date().toLocaleString('es-AR')} · Idioma: ${lang.toUpperCase()}
            </p>
          </div>
        </div>
      `
    };

    const primerNombre = nombre.split(' ')[0];

    const mailAlCliente = {
      from: `"Metodo Raiz" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: t.subjectClient(primerNombre),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px; margin: 0 auto; color: #1f2a24;">
          <div style="background: #f5f1ea; padding: 40px 28px; border-radius: 12px;">
            <h2 style="font-family: Georgia, serif; font-weight: 500; margin: 0 0 28px; font-size: 28px; color: #1f2a24;">
              ${t.greeting(primerNombre)}
            </h2>
            <p style="font-size: 16px; line-height: 1.6; color: #4a544d; margin: 0 0 24px;">
              ${t.summary}
            </p>
            <div style="background: #ffffff; border-radius: 10px; padding: 24px; margin-bottom: 28px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #8a8f88; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #eee;">${t.classLabel}</td>
                  <td style="padding: 10px 0; text-align: right; font-size: 15px; border-bottom: 1px solid #eee;">${t.classValue}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #8a8f88; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #eee;">${t.timeLabel}</td>
                  <td style="padding: 10px 0; text-align: right; font-size: 15px; border-bottom: 1px solid #eee;">${horario}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #8a8f88; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #eee;">${t.costLabel}</td>
                  <td style="padding: 10px 0; text-align: right; font-size: 15px; font-weight: 600; color: #3f5a46; border-bottom: 1px solid #eee;">${t.costValue}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #8a8f88; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">${t.locationLabel}</td>
                  <td style="padding: 10px 0; text-align: right; font-size: 15px;">${t.locationValue}</td>
                </tr>
              </table>
            </div>
            <div style="background: #e8f0e5; border-radius: 10px; padding: 20px; margin-bottom: 28px;">
              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #3f5a46;">
                ${t.whatToBring}
              </p>
            </div>
            <p style="font-size: 15px; line-height: 1.6; color: #4a544d; margin: 0 0 12px;">
              ${t.confirmMsg(telefono)}
            </p>
            <p style="font-size: 15px; line-height: 1.6; color: #4a544d; margin: 0 0 28px;">
              ${t.doubtMsg}
            </p>
            <a href="https://wa.me/13055550000" style="display: inline-block; background: #25d366; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 15px;">
              ${t.waButton}
            </a>
            <p style="font-size: 16px; line-height: 1.6; color: #4a544d; margin-top: 36px;">
              ${t.closing}<br>
              <strong style="color: #3f5a46;">${t.signature}</strong>
            </p>
          </div>
        </div>
      `
    };

    await Promise.all([
      transporter.sendMail(mailAlEntrenador),
      transporter.sendMail(mailAlCliente)
    ]);

    guardarReserva(email);

    console.log('✓ Mails enviados correctamente (idioma:', lang, ') a:', email);
    res.json({ ok: true, message: 'Reserva recibida' });

  } catch (error) {
    console.error('✗ ERROR al enviar mail:', error.message);
    console.error('Detalle:', error);
    res.status(500).json({ ok: false, error: 'No pudimos procesar la reserva' });
  }
});

// ---------- Prende el servidor ----------
app.listen(PORT, () => {
  console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
});
