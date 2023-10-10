const express = require('express')
const { getAllBlogController,
    createAllConroller,
    updateAllBlogController,
    singleAllBlogController,
    deleteAllBlogController } = require('../controllers/blogController')

const router = express.Router()


//GET BLOG===
router.get('/all-blog', getAllBlogController)

//POST BLOG=======
router.post('/create-blog', createAllConroller)

// UPDATE BLOG=======
router.put('/update-blog/:id', updateAllBlogController)

//SINGLE BLOG DETAILS=====
router.get('/get-blog/:id', singleAllBlogController)

// DELETE BLOG======
router.delete('/delete-blog/:id', deleteAllBlogController)


module.exports = router