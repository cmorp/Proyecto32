import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getPosts, addPosts, putLikes, deletePost } from './database/consultas.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server initialized in port http://localhost:${PORT}`));

app.get('/posts', async (req, res) => {
    const rows = await getPosts();
    res.json(rows);
})

app.post('/posts', async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body;
    const rows = await addPosts(titulo, img, descripcion, likes);
    res.json({ titulo, img, descripcion, likes });
})

app.put('/posts/like/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const update = await putLikes(id);
        res.status(200).json({
            message: "¡Like agregado exitosamente!"
    })
 } catch (error) {
        res.status(500).json({
            message: "Error al aumentar los likes."
        })
    }
})

app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deletePost(id);
        res.status(200).json ({
            message:"¡Post eliminado exitosamente!"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error al borrar el post."
        })
    }
})
