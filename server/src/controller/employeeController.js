const express = require("express");
const Employee = require("../model/employeeModel");

const router = express.Router();

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error });
    }
}

const createEmployee = async (req, res) => {
    try {
        const { name, status, employeeId, fromDate, totalLeaveDays } = req.body;
        const newEmployee = new Employee({ name, status, employeeId, fromDate, totalLeaveDays });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: "Error creating employee", error });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status, employeeId, fromDate, totalLeaveDays } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, status, employeeId, fromDate, totalLeaveDays }, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: "Error updating employee", error });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee", error });
    }
}

module.exports = { getAllEmployees, createEmployee, updateEmployee, deleteEmployee };