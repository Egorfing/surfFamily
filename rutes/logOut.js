const router = require('express').Router();
// const { cookiesCleaner} = require("../midlleware/auth");

// router.get('/', (req, res) => {
//   cookiesCleaner()
//     res.redirect('/login');
// });
router.get('/',async (req, res, next)=>{
  if(req.session.user){
    try{
      await req.session.destroy()
      // res.locals.name = null
      res.clearCookie('user_sid')
      res.redirect('/')
    }catch (error){
     next(error)
    }
  }else{
    res.redirect('/')
  }
  })
module.exports = router;
