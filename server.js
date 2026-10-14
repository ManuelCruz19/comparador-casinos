const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 10000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Lista de casinos para la API
const casinos = [
    {
        id: 1,
        nombre: "Codere Casino",
        calificacion: "4.9",
        bono: "$5,000 MXN + 100 Giros Gratis",
        metodos_pago: "SPEI, OXXO Pay, Visa/Mastercard",
        link_afiliado: "https://www.codere.mx"
    },
    {
        id: 2,
        nombre: "Bet365",
        calificacion: "4.8",
        bono: "100% hasta $4,000 MXN en Tu Primer Depósito",
        metodos_pago: "Tarjeta de Crédito, SPEI, Todito Cash",
        link_afiliado: "https://www.bet365.mx"
    },
    {
        id: 3,
        nombre: "Caliente Casino",
        calificacion: "4.7",
        bono: "$1,000 MXN Gratis Sin Depósito",
        metodos_pago: "OXXO, Banamex, SPEI, Caliente Card",
        link_afiliado: "https://www.caliente.mx"
    }
];

// Endpoint API casinos
app.get('/api/casinos', (req, res) => {
    res.json(casinos);
});

// Redirección de afiliados
app.get('/go/:id', (req, res) => {
    const casinoId = parseInt(req.params.id);
    const casino = casinos.find(c => c.id === casinoId);
    if (casino) {
        res.redirect(casino.link_afiliado);
    } else {
        res.redirect('/');
    }
});

// Asegurar que cualquier ruta cargue el index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor en línea en el puerto ${PORT}`);
});
