const express = require('express');
const dbRouter = express.Router();

const dbController = require('../controllers/dbController');

dbRouter.post('/addhospital', dbController.addhospital);

dbRouter.get('/gethospital', dbController.gethospital);

dbRouter.delete('/deletehospital/:username', dbController.deletehospital);

dbRouter.get('/vaccinated/:aadhar', dbController.getvaccinated);

dbRouter.post('/bookappointment', dbController.bookappointment);

dbRouter.post('/getappointment', dbController.getappointments);

dbRouter.post('/confirmvaccine', dbController.confirmvaccine);

dbRouter.post('/deletevaccine', dbController.deletevaccine);

dbRouter.post('/updatecount', dbController.updatecount);

dbRouter.post('/getvaccinecount', dbController.getvaccinecount)




module.exports = dbRouter;