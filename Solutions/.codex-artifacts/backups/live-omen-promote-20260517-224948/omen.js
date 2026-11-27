"use strict";

const { createClient } = require("@supabase/supabase-js");
const config = require("../config");
const { getOmenLiveEmpty } = require("./systemContracts");

const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);

function safePlatformSummary(row) {
  return {
    platform: row.platform,
    league_id: row.league_id || null,
    username: row.platform === "sleeper" ? row.platform_username || null : null,
  };
}

async function authenticateOmenRequest(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw Object.assign(new Error("Missing bearer token"), { status: 401 });
  }

  const token = authHeader.slice("Bearer ".length).trim();
  if (!token) {
    throw Object.assign(new Error("Missing bearer token"), { status: 401 });
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    throw Object.assign(new Error("Invalid or expired token"), { status: 401 });
  }

  return data.user;
}

async function getActivePlatformConnections(userId) {
  const { data, error } = await supabase
    .from("platform_connections")
    .select("platform,league_id,platform_username,is_active")
    .eq("user_id", userId)
    .eq("is_active", true);

  if (error) {
    throw new Error(`platform_connections lookup failed: ${error.message}`);
  }

  return Array.isArray(data) ? data : [];
}

async function getLiveOmenForUser(userId) {
  const connections = await getActivePlatformConnections(userId);

  if (!connections.length) {
    return getOmenLiveEmpty({
      status: "needs_platform_connection",
      message: "Connect Yahoo, Sleeper, or ESPN before a personalized Omen can be generated.",
      connected_platforms: [],
    });
  }

  return getOmenLiveEmpty({
    status: "connected_platform_pending_live_engine",
    message:
      "A fantasy platform is connected. The roster-backed Omen engine is not promoted yet, so no live recommendation is returned.",
    connected_platforms: connections.map(safePlatformSummary),
  });
}

module.exports = {
  authenticateOmenRequest,
  getActivePlatformConnections,
  getLiveOmenForUser,
};
