const handleSqlErrors = (err, req, res, next) =>  {
        if (err.code === '22P02') {
            res.status(400).send({ message: 'Bad request' });
        }  else if (err.code === '23503') {
            res.status(404).send({ message: 'Not Found' });
         } 
        else {
            next(err); 
        }
    }
        

const handle404Errors = (err, req, res, next) =>  {
            res.status(404).send({  message: 'Not Found' });
}


const handleCustomErrors = (err, req, res, next) =>  {
        if (err.message !== undefined) {
            res.status(err.status).send({ message: err.message });
        }   else {
            next(err);
        }
    }
const handle500s = (err, req, res, next) =>  {
        console.log(err);
        res.sendStatus(500);
        }  

module.exports = { handle500s, handleCustomErrors, handleSqlErrors, handle404Errors }