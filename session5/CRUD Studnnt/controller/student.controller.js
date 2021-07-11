const studentModel = require("../models/student.model");

addStudent = async (req, res) => {
  try {
    const data = new studentModel(req.body);
    await data.save();
    res.status(200).send({
      apiStatus: true,
      message: "data inserted",
      data: data,
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: e.message,
    });
  }
};

allStudents = async (req, res) => {
  try {
    const data = await studentModel.find();
    res.status(200).send({
      apiStatus: true,
      message: "data retrived",
      data: data,
      count: data.length,
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: e.message,
      data: e,
    });
  }
};

singleStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await studentModel.findById(id);

    if (!data) {
      res.status(404).send({
        apiStatus: true,
        message: "Sduent is exsist",
        data: null,
      });
    }
    res.status(200).send({
      apiStatus: true,
      message: "data retrived",
      data: data,
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: "error loading data",
      data: e,
    });
  }
};

deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await studentModel.findByIdAndDelete(id);

    if (!data) {
      res.status(404).send({
        apiStatus: true,
        message: "Student  not found",
        data: null,
      });
    }
    res.status(200).send({
      apiStatus: true,
      message: "data retrived",
      data: data,
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: "error loading data",
      data: e,
    });
  }
};
editStudent = async (req, res) => {
  const myAllowedUpdates = ["name", "password", "email", "birthDate"];
  const updates = Object.keys(req.body);
  isValid = updates.every((up) => myAllowedUpdates.includes(up));
  if (!isValid) res.status(500).send("not avalible");
  try {
    const student = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (!student) res.send("Not exist");
    res.send("Updated");
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      message: "error loading data",
      data: e,
    });
  }
};

module.exports = {
  addStudent,
  allStudents,
  singleStudent,
  deleteStudent,
  editStudent,
};
