exports.getLogin = (req,res,next)=>{
    //console.log(req.get('Cookie').split('=')[1]);
    const isLoggenIn = req.get('Cookie').split('=')[1];
    res.render('auth/login',{
        path:'/login',
        pageTitle:'Login',
        isAuthenticated:isLoggenIn
    });
};

exports.postLogin = (req,res,next)=>{
    res.setHeader('Set-Cookie','loggedIn=true');
    res.redirect('/');
}
