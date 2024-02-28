const mysql = require('mysql2'); 
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "ahamedismailhisamm@gmail.com", 
      pass: "ltqc hkaz dsig yzdi",
    }
});

var con = null;
try {
  con = mysql
    .createPool({
      host: "coviddb.cu4aa78nopao.us-east-1.rds.amazonaws.com",
      user: "root",
      password: "5252864Mi",
      port: 3306,
      database: "covid_db",
    })
    .promise();
  console.log("db connected");
} catch (err) {
  console.log(err);
}

const gethospital = async (req, res) => {
    try {
        const [datarows] = await con.query('select * from hospital');
        res.status(200).json({ datarow: datarows, res: "ok" });
    }
    catch (err) {
        console.log(err);
        console.log("error occured at gethospital");
        res.json({ msg: "Error occured at gethospital", res: 'no' });
    }
}



const addhospital =async (req, res) => {
    try {
        const { username, password, xcord, ycord, address, district, state } = req.body;
        const vaccineCount = 0;
        
        const hashedpassword = await bcrypt.hash(password,10);
        await con.query("INSERT INTO hospital VALUES(?,?,?,?,?,?,?,?)", [username, hashedpassword, xcord, ycord, address, district, state, vaccineCount]);

        res.status(200).json({ msg: "Hospital added successfully", res: "ok" });

    }
    catch (err) {
        console.log(err);
        console.log("error occured at addhospital");
        res.json({ msg: "Error occured at addhospital", res: 'no' });
    }
}

const deletehospital = async (req, res) => {
    try {
        const username = req.params.username;

        con.query("delete from hospital where username=?", [username]);
        res.status(200).json({ msg: "Hospital deleted successfully", res: "ok" });
    }
    catch (err) {
        console.log(err);
        console.log("error occured at deletehospital");
        res.json({ msg: "Error occured at deletehospital", res: 'no' });
    }
}

const getvaccinated = async (req, res) => {
    try {
        const aadhar = req.params.aadhar;
        const [data] = await con.query("select vaccinated, isappointed from user where aadhar=?", [aadhar]);
        const isvac = data[0];
        console.log(isvac);

        res.json({ data: isvac, res: "ok" });
    } catch (err) {
        console.log(err);
        console.log("error occured at getvaccinated");
        res.json({ msg: "Error occured at getvaccinated", res: 'no' });
    }

}

const bookappointment = async(req, res) => {
    try {
        const { aadhar, username } = req.body;

        const [data] = await con.query("select * from user where aadhar=?", [aadhar]);
        const name = data[0].name;
        const gender = data[0].gender;

        const email = data[0].email;

        await con.query("insert into appointment values(?,?,?,?)",[username, aadhar, name, gender]);

        await con.query("UPDATE user SET isappointed = '1' WHERE aadhar =?", [aadhar]);

        const today = new Date();

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const year = tomorrow.getFullYear();
        const month = tomorrow.getMonth() + 1; // Month is 0-indexed, so we add 1
        const day = tomorrow.getDate();

        // Format the date as needed
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;


        const mailOptions = {
            from: "ahamedismailhisamm@gmail.com",
            to: email, 
            subject: "Vaccination Appointment",
            text: `Your Vaccination appointment has been accepted <br/> Venue: ${username} <br /> Date: ${formattedDate}<br/> Time: 5:00 pm`,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error.message);
                return;
            }
            console.log('Email sent successfully!');
        });

        res.json({ msg: "Appointment booked successfully", res: "ok" });

    }
    catch (err) {
        console.log(err);
        console.log("error occured at bookappointment");
        res.json({ msg: "Error occured at bookappointment", res: 'no' });
    }
}

const getappointments = async(req, res) => {
    try {
        const  username  = req.body.username;
        console.log(username);
        const [data] = await con.query("select * from appointment where username=?", [username]);
        console.log(data);
        res.json({ datarow: data, res: "ok" });

    } catch (err) {
        console.log(err);
        console.log("error occured at getappointments");
        res.json({ msg: "Error occured at getappointments", res: 'no' });
    }
}

const confirmvaccine = async (req, res) => {
    try {
        const { uname, aadhar } = req.body;
        console.log(uname, aadhar);

        await con.query("delete from appointment where aadhar=?", [aadhar]);

        await con.query("update  hospital set vaccineCount=vaccineCount-1 where username=?", [uname]);

        await con.query(`update  user set vaccinated="1" ,isappointed="0" where aadhar = ?`, [aadhar]);

        res.json({ msg: "appointment confirmed", res: "ok" });
    }
    catch (err) {
        console.log(err);
        console.log("error occured at confirmvaccine");
        res.json({ msg: "Error occured at confirmvaccine", res: 'no' });
    }
}


const deletevaccine = async (req, res) => {
    try {
        const { username, aadhar } = req.body;

        await con.query("delete from appointment where aadhar=?", [aadhar]);


        await con.query(`update  user set vaccinated="0" ,isappointed="0" where aadhar = ?`, [aadhar]);

        res.json({ msg: "appointment deleted", res: "ok" });
    }
    catch (err) {
        console.log(err);
        console.log("error occured at confirmvaccine");
        res.json({ msg: "Error occured at confirmvaccine", res: 'no' });
    }
}


const updatecount = async (req, res) => {
    try {
        const { username, vaccineCount } = req.body;
        
        await con.query(`update  hospital set vaccineCount=? where username=?`, [vaccineCount , username]);

        res.json({ msg: "Updated vaccine count ", res: "ok" });
    }
    catch (err) {
        console.log(err);
        console.log("error occured at updatecount");
        res.json({ msg: "Error occured at updatecount", res: 'no' });
    }
}

const getvaccinecount = async (req, res) => {
    try {
        const { username } = req.body;
        console.log(username);

        const [data] = await con.query("select vaccineCount from hospital where username=?", [username]);
        console.log(data);
        res.json({ data: data, res: "ok" });
    }
    catch (err) {
        console.log(err);
        console.log("error occured at updatecount");
        res.json({ msg: "Error occured at updatecount", res: 'no' });
    }
}

module.exports = {gethospital, addhospital, deletehospital , getvaccinated, bookappointment, getappointments, confirmvaccine, deletevaccine, updatecount, getvaccinecount};