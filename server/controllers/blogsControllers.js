import express from 'express'
import _blogsService from '../services/_blogsService'

export default class BlogController {

      async getAllBlogs(req, res, next) {
            try {
                  let blogs = await _blogsService.find()
                  res.send(blogs)
            } catch (error) {
                  next(error)
            }
      }


      async getBlogsBySlug(req, res, next) {
            try {
                  if (!req.query.slug) {
                        return next()
                  }
                  let blogs = await _blogsService.find({ slug: { $in: [req.query.slug] } })
                  if (!req.query.slug) {
                        return res.status(400).send("No blog with title")
                  }
                  res.send(blogs)
            } catch (error) { next(error) }
      }


      async getBlogsByTag(req, res, next) {
            try {
                  if (!req.query.tags) {
                        return next()
                  }
                  let blogs = await _blogsService.find({ tags: { $in: [req.query.tags] } })
                  if (!req.query.tags) {
                        return res.status(400).send("No blog with tag")
                  }
                  res.send(blogs)
            } catch (error) { next(error) }
      }



      async getOneBlogById(req, res, next) {
            try {
                  let blog = await _blogsService.findById(req.params.blogId)
                  if (!blog) {
                        return res.status(400).send("Blog not found")
                  }
                  res.send(blog)
            } catch (error) { next(error) }
      }


      async createBlog(req, res, next) {
            try {
                  let blog = await _blogsService.create(req.body)
                  res.send(blog)
            } catch (error) { next(error) }
      }


      async editBlogById(req, res, next) {
            try {
                  let editedBlog = await _blogsService.findByIdAndUpdate(req.params.blogId, req.body, { new: true })
                  res.send(editedBlog)
            } catch (error) { next(error) }
      }

      async deleteBlogById(req, res, next) {
            try {
                  let deleteBlog = await _blogsService.findByIdAndDelete(req.params.blogId)
                  res.send("Blog Deleted")
            } catch (error) { next(error) }
      }


      constructor() {
            this.router = express.Router()
                  .get('', this.getAllBlogs)
                  .get('', this.getBlogsBySlug)
                  .get('', this.getBlogsByTag)
                  .get('/:blogId', this.getOneBlogById)
                  .post('', this.createBlog)
                  .put('/:blogId', this.editBlogById)
                  .delete('/:blogId', this.deleteBlogById)
      }
}