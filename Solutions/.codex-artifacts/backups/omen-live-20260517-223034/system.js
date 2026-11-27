"use strict";

const express = require("express");
const config = require("../config");
const {
  getHealthStatus,
  getOmenOfTheWeekMock,
  getPlatformStatus,
} = require("../services/systemContracts");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json(getHealthStatus());
});

router.get("/omen-of-the-week", (_req, res) => {
  res.json(getOmenOfTheWeekMock());
});

router.get("/platform-status", (_req, res) => {
  res.json(getPlatformStatus(config));
});

module.exports = router;
