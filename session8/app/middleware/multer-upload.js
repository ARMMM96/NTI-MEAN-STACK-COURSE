const multer = require('multer')
const path = require('path')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const loc = path.join('uploads', (req.user._id).toString())
        fs.mkdir(loc, (err) => { if (err) return;});
        cb(null, loc)
    },
    filename: function (req, file, cb) {
        // console.log(req.user._id)
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({ 
    storage: storage ,
    limits: { 
        fileSize: 150000 
    },
    fileFilter: function (req, file, callback) {
        let fType = "."+req.body.fileType
        // console.log(fType)
        var ext = path.extname(file.originalname);
        if(ext != fType) {
            return callback(new Error('invalid extension'))
        }
        callback(null, true)
    },
})

module.exports = upload



// var upload = multer({ dest: 'uploads/' })
// fs = require('fs')
// app.post('/profile', upload.single('avatar'), async (req, res) =>{
//     // res.send(req.file)
//    data =  (req.file.originalname.split('.')).pop()
//    newName = req.file.destination+ req.file.filename+"."+data
//   // res.send(newName)
//     fs.rename(req.file.path, newName,  function(err){
//         if (err) {
//             console.log('err: ' + err);
//         } else {
//             console.log('rename - ok');
//         }})
//     res.send(data)
// })
