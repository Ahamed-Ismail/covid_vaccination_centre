const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

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

const adminCredentials = {
  username: "admin",
  password: "12345",
};

const hashpassword = async (password) => {
  try {
    return bcrypt.hash(password, 10);
  } catch (err) {
    console.log("error occured at hashpassword");
  }
};

const signup = async (req, res) => {
  try {
    const { aadhar, name, password, phoneno, bloodg, dob, email, gender } =
      req.body;
      const vacinated = 0;
      
      if (aadhar.length != 12) {
          return res.json({ msg: "Aadhar should be 12 digits", res: "no" });
      }

      if (phoneno.length != 10) {
        return res.json({ msg: "Phone number should be 10 digits", res: "no" });
      }

    const dobyear = parseInt(dob.slice(0,4));
      const dobmonth = parseInt(dob.slice(5, 7));
      

    const curryear = new Date().getFullYear();
    const currmonth = new Date().getMonth() + 1;

    let age = parseInt(curryear) - parseInt(dobyear);
    if (parseInt(currmonth) > parseInt(dobmonth)) {
      age += 1;
    }

    if (age < 18) {
      return res.json({
        msg: "Age must be greater than or equal to 18",
        res: "no",
      });
    }

    const parsedPhoneno = parseInt(phoneno);
    const hashedpassword = await hashpassword(password);

    const query = "INSERT INTO user VALUES(?,?,?,?,?,?,?,?,?,?)";
    const isappointed = '0';
    await con.query(query, [
      aadhar,
      name,
      hashedpassword,
      parsedPhoneno,
      bloodg,
      dob,
      email,
      gender,
      vacinated,
      isappointed
    ]);
    res.status(200).json({ msg: "User added successfully", res: "ok" });
  } catch (err) {
    console.log(err);
    console.log("error occured at signup");
    res.json({ msg: "Error occured at signup", res: "no" });
  }
};

const userlogin = async (req, res) => {
  try {
      const { aadhar, password } = req.body;

    const [data] = await con.query("select password from user where aadhar=?", [
      aadhar,
    ]);

    if (data.length == 0) {
      res.json({ msg: "User doesnt exist", res: "no" });
      return;
    }
      const hashedpassword = data[0].password;

    const matched = await bcrypt.compare(password, hashedpassword);

    if (matched) {
      res.status(200).json({ msg: "logged in successfully", res: "ok" });
    } else {
      res.json({ msg: "Invalid credentials", res: "no" });
    }
  } catch (err) {
    console.log(err);
    console.log("error occured at userlogin");
    res.json({ msg: "Error occured at userlogin", res: "no" });
  }
};

const hospitallogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    const [data] = await con.query(
      "select password from hospital where username=?",
      [username]
    );

    if (data.length == 0) {
      res.json({ msg: "Hospital doesnt exist", res: "no" });
      return;
    }
    const hashedpassword = data[0].password;

    const matched = await bcrypt.compare(password, hashedpassword);

    if (matched) {
      res.status(200).json({ msg: "logged in successfully", res: "ok" });
    } else {
      res.json({ msg: "Invalid credentials", res: "no" });
    }
  } catch (err) {
    console.log(err);
    console.log("error occured at hospitallogin");
    res.json({ msg: "Error occured at hospitallogin", res: "no" });
  }
};

const adminlogin = (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      res.status(200).json({ msg: "Logged in", res: "ok" });
    } else {
      res.json({ msg: "Invalid credentials", res: "no" });
    }
  } catch (err) {
    console.log(err);
    console.log("error occured at adminlogin");
    res.json({ msg: "Error occured at adminlogin", res: "no" });
  }
};

module.exports = { signup, userlogin, hospitallogin, adminlogin };
