"use strict";

process.env.SUPABASE_URL ||= "https://example.supabase.co";
process.env.SUPABASE_SERVICE_KEY ||= "test-service-key";
process.env.LLM_BASE_URL = "http://ollama.internal:11434";
process.env.LLM_MODEL = "gemma3:4b";

const assert = require("node:assert/strict");
const http = require("node:http");
const test = require("node:test");
const express = require("express");

function buildApp() {
  const app = express();
  app.use("/api", require("../src/routes/system"));
  app.use((err, _req, res, _next) => {
    res.status(err.status || 500).json({ error: err.message });
  });
  return app;
}

async function request(app, path) {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}${path}`);
    return {
      status: res.status,
      body: await res.json(),
    };
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test("GET /api/health returns stable public health shape", async () => {
  const app = buildApp();
  const res = await request(app, "/api/health");

  assert.equal(res.status, 200);
  assert.equal(res.body.status, "ok");
  assert.equal(res.body.service, "ssffmvp-api");
  assert.equal(res.body.contract_version, "system-health.v1");
  assert.equal(typeof res.body.uptime, "number");
});

test("GET /api/omen-of-the-week returns deterministic mock recommendation", async () => {
  const app = buildApp();
  const res = await request(app, "/api/omen-of-the-week");

  assert.equal(res.status, 200);
  assert.equal(res.body.status, "mock_ready");
  assert.equal(res.body.mode, "mock");
  assert.equal(res.body.is_mock, true);
  assert.equal(res.body.recommendation.move_type, "lineup_swap");
  assert.equal(res.body.recommendation.confidence_score, 78);
  assert.equal(res.body.recommendation.primary_action.projected_points_delta, 3.8);
  assert.ok(Array.isArray(res.body.recommendation.reasoning));
  assert.ok(Array.isArray(res.body.recommendation.alternatives));
});

test("GET /api/platform-status reports readiness without leaking LLM URL", async () => {
  const app = buildApp();
  const res = await request(app, "/api/platform-status");

  assert.equal(res.status, 200);
  assert.equal(res.body.status, "ok");
  assert.equal(res.body.dependencies.llm.status, "configured_private");
  assert.equal(res.body.dependencies.llm.public_url_exposed, false);
  assert.equal(res.body.endpoints.omen_of_the_week.path, "/api/omen-of-the-week");

  const serialized = JSON.stringify(res.body);
  assert.equal(serialized.includes("ollama.internal"), false);
  assert.equal(serialized.includes("11434"), false);
});
