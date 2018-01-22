module.exports = {
    
    index (req, res, next) {
        req.assert('ski_id', 'O campo ski_id é obrigatório.').notEmpty(); 
        let errors = req.validationErrors();
        errors ? res.status(400).json(errors) : next();
    }
}
