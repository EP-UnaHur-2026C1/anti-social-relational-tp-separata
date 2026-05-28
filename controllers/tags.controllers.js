const { Tag, Post } = require("../models")

const obtenerTags = async (req, res) => {
    try {
        const tags = await Tag.findAll({
            attributes: ["nombre"],
            include: {
                model: Post,
                as: "posts",
                attributes: ["id"]
            }
        })
        res.status(200).json(tags)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las tags." })
    }
}

const obtenerTag = (req, res) => {
    const tag = req.tag
    res.status(200).json(tag)
}

const crearTag = async (req, res) => {
    try {
        const { nombre } = req.body
        const tag = await Tag.create({nombre})
        res.status(201).json(tag)
    } catch (error) {
        res.status(500).json({ error: "Error al crear la tag." })
    }
}

const actualizarTag = async (req, res) => {
    try {
        const { nombre } = req.body
        const tag = req.tag
        await tag.update({nombre})
        res.status(200).json(tag)
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la tag." })
    }
}

const eliminarTag = async (req, res) => {
    try {
        const tag = req.tag
        await tag.destroy()
        res.status(200).json({ message: "Tag eliminada correctamente." })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la tag." })
    }
}

module.exports = {
    obtenerTags,
    obtenerTag,
    crearTag,
    actualizarTag,
    eliminarTag
}