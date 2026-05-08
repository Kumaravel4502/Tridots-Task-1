const express=require("express");
const router=express.Router();
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } = require("../controller/employeeController");

router.get("/employees", getAllEmployees);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

module.exports=router;