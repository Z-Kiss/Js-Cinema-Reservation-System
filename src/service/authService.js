
const login = (req, res, next) =>{
    const {name} = req.body;
    if(!name){
        return res.status(400).send('Need a UserName to be able to use the application');
    }
    res.cookie('AUTH', name, {domain: 'localhost', path: '/',expires: new Date(Date.now() + 1200000)});
    return next();
}

const logout = (req, res) =>{
    res.clearCookie('AUTH');
    return res.sendStatus(200);
}

module.exports = {
    logout,
    login
}