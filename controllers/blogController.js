const mongoose = require('mongoose');
const blogModels = require('../config/models/blogModels');
const userModel = require('../config/models/userModels');

//GET ALL BLOGS===================
exports.getAllBlogController = async (req, resp) => {

    try {
        const blogs = await blogModels.find({}).populate("user");
        if (!blogs) {
            return resp.status(200).send({
                success: false,
                message: "No Blogs Found"
            })
        }
        return resp.status(200).send({
            blogCount: blogs.length,
            success: true,
            message: "All Blogs Lists",
            blogs
        })

    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error while geting blog",
            error
        })
    }

};

//CREATE BLOGS ======================
exports.createAllConroller = async (req, resp) => {

    try {
        const { image, description, title, user } = req.body
        if (!image || !description || !title || !user) {
            return resp.status(400).send({
                success: false,
                message: "Please provide all Fields",


            })
        }
        const existingUser = await userModel.findById(user)
        if (!existingUser) {
            return resp.status(404).send({
                success: false,
                message: "Unable to find user"
            })
        }

        const postBlog = new blogModels({ title, description, image, user })
        const session = await mongoose.startSession();
        session.startTransaction();
        await postBlog.save({ session });
        existingUser.blogs.push(postBlog);
        await existingUser.save({ session });
        await session.commitTransaction();
        await postBlog.save();
        return resp.status(201).send({
            success: true,
            message: "Blog Created",
            postBlog,

        });

    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error while creating post",
            error
        })
    }

};

// UPDATE BLOGS =================

exports.updateAllBlogController = async (req, resp) => {

    try {
        const { id } = req.params
        const { image, description, title } = req.body
        const blog = await blogModels.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return resp.status(200).send({
            success: true,
            message: "Blog Updated!",
            blog,
        })

    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error while updating blog",
            error
        })
    }

};

// GET SINGLE USER DETAILS=====================

exports.singleAllBlogController = async (req, resp) => {

    try {
        const { id } = req.params

        const blog = await blogModels.findById(id)
        if (!blog) {
            return resp.status(404).send({
                success: false,
                message: "Blog Not found with US"
            })

        }
        return resp.status(200).send({
            success: true,
            message: "Fetch single blog",
            blog
        })

    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error while geting single blog"
        })
    }

};

//  DELETE POST =============
exports.deleteAllBlogController = async (req, resp) => {

    try {
        await blogModels.findOneAndDelete(req.params.id);
        return resp.status(200).send({
            success: true,
            message: "Blog Deleted"
        })

    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error while deleting blog",
            error
        })
    }

};