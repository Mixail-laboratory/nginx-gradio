const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Настройка транспортера
const transporter = nodemailer.createTransport({
    service: 'gmail', // Используйте ваш почтовый сервис (например, Gmail)
    auth: {
        user: 'spectrafa@gmail.com', // Ваша электронная почта
        pass: '36589743658', // Ваш пароль (или пароль приложения)
    },
});

app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email, // От кого
        to: 'spectrafa@gmail.com', // Куда отправить
        subject: subject,
        text: `Сообщение от ${name} (${email}):\n\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent: ' + info.response);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});