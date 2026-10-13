const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configuración con las API Keys de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Ruta para obtener los casinos
app.get('/api/casinos', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('casinos')
            .select('*')
            .order('calificacion', { ascending: false });

        if (error) throw error;
        res.json(data || []);
    } catch (err) {
        console.error("Error en Supabase:", err);
        res.status(500).send("Error al obtener los casinos");
    }
});

// Ruta de redirección de afiliados
app.get('/go/:id', async (req, res) => {
    const casinoId = req.params.id;
    try {
        const { data, error } = await supabase
            .from('casinos')
            .select('link_afiliado')
            .eq('id', casinoId)
            .single();

        if (error || !data) {
            return res.status(404).send("Casino no encontrado");
        }

        res.redirect(data.link_afiliado);
    } catch (err) {
        console.error("Error de redirección:", err);
        res.status(500).send("Error de redirección");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});