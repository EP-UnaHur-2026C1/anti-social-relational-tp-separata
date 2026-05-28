const { Post_Images, Post } = require("../models")

const obtenerPost_Images = async (req, res) => {
    try {
        const post_Images = await Post_Images.findAll({attributes: ["id", "url", "postId"]})
        res.status(200).json(post_Images)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error al obtener las asociaciones de las imagenes." })
    }
}

const obtenerPost_Image = (req, res) => {
    const post_Image = req.post_Image
    res.status(200).json(post_Image)
}

const crearPost_Image = async (req, res) => {
    try {
        const { url, postId } = req.body
        const post_image = await Post_Images.create({
            url,
            postId
        })
        res.status(201).json(post_image)
    } catch (error) {
        res.status(500).json({ error: "Error al crear la asociación." })
    }
}

const actualizarPost_Image = async (req, res) => {
    try {
        const { url, postId } = req.body
        const post_Image = req.post_Image
        await post_Image.update({
            url,
            postId
        })
        res.status(200).json(post_Image)
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la asociación." })
    }
}

const eliminarPost_Image = async (req, res) => {
    try {
        const post_Image = req.post_Image
        await post_Image.destroy()
        res.status(200).json({ message: "Asociación eliminada correctamente." })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la asociación." })
    }
}

module.exports = {
    obtenerPost_Images,
    obtenerPost_Image,
    crearPost_Image,
    actualizarPost_Image,
    eliminarPost_Image
}