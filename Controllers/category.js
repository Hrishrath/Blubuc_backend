const Category =   require('../Models/category')
const {validationResult} = require('express-validator');

exports.getCategoryById = (req, res, next, id) => {
    Category.find(id).exec((err, category) => {
        if(err){
            return res.status(400).json({
                error: "No Category Found"
            })
        }
        req.category = category;
        next();
    })
}


exports.addCategory = (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.Aaray()[0].msg
        })
    }

    const category = new Category(req.body)

    category.save((err, cat) => {
        if(err){
            return res.status(400).json({
                error: "Adding Category failed"
            })
        }

        res.json(cat);
    })


}


exports.getCategories = (req, res) => {
    Category.find().exec((err,category) => {
        if(err){
            return res.status(400).json({
                error: "No category found"
            })
        }
        res.json(category)
    })

}

exports.getCategory = (req, res) => {
    setTimeout(() => {
        return res.json(req.category);
    }, 20);
}



exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Category updation failed"
            })
        }
        res.json(updatedCategory)
    })
}


// exports.updateCategory = (req, res) => {
//     const category = req.category;
//     category.name = req.body.name;

//     Category.findByIdAndUpdate(
//         {_id: category._id},
//         {$set: {name: category.name}},
//         {new: true},
//         (err, updatedCategory) => {
//             if(err){
//                 return res.status(400).json({
//                     error: "Category updation failed"
//                 })
//             }
//             res.json(updatedCategory)
//         }
//     )
// }


// exports.deleteCategory = (req, res) => {
//     const category = req.category
//     category.remove((err, category) => {
//         if(err){
//             return res.status(400).json({
//                 error: "Category updation failed"
//             })
//         }
//         res.json({ message: `Successfully Deleted ${req.category.name}`})
//     })
// }


exports.deleteCategory = (req, res) => {
    Category.findOneAndDelete(
        {_id: req.category._id},
        (err, category) => {
            if(err){
                return res.status(400).json({
                    error: "Category updation failed"
                })
            }
            res.json({ message: `Successfully Deleted ${req.category.name}`})
        }
    )
} 