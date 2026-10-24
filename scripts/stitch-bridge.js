#!/usr/bin/env node
const { execFileSync } = require('child_process');

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'groovy-legacy-471712-g8';
const GCLOUD_DIR = 'D:\\Google CLI\\google-cloud-sdk\\bin';
const GCLOUD_CONFIG = 'C:\\Users\\lenovo\\AppData\\Roaming\\gcloud';

function getAccessToken() {
  const customEnv = {
    ...process.env,
    CLOUDSDK_CONFIG: process.env.CLOUDSDK_CONFIG || GCLOUD_CONFIG,
    APPDATA: process.env.APPDATA || 'C:\\Users\\lenovo\\AppData\\Roaming',
    USERPROFILE: process.env.USERPROFILE || 'C:\\Users\\lenovo',
    SystemRoot: process.env.SystemRoot || 'C:\\Windows',
    PATH: `${GCLOUD_DIR};C:\\Windows\\system32;C:\\Program Files\\nodejs;${process.env.PATH || ''}`
  };

  const stdout = execFileSync('cmd.exe', ['/c', 'gcloud.cmd', 'auth', 'print-access-token'], {
    encoding: 'utf8',
    env: customEnv,
    stdio: ['ignore', 'pipe', 'ignore'],
    windowsHide: true,
  });
  return stdout.trim();
}

async function callStitch(toolName, args = {}) {
  const token = getAccessToken();
  const res = await fetch('https://stitch.googleapis.com/mcp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-Goog-User-Project': PROJECT_ID
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args
      }
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Stitch API error (${res.status}): ${errorText}`);
  }

  const json = await res.json();
  if (json.error) {
    throw new Error(`Stitch RPC error: ${json.error.message}`);
  }
  return json.result;
}

if (require.main === module) {
  const tool = process.argv[2] || 'list_projects';
  const argsJson = process.argv[3] ? JSON.parse(process.argv[3]) : {};
  callStitch(tool, argsJson)
    .then(result => {
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
      console.error(err.message);
      process.exit(1);
    });
}

module.exports = { callStitch, getAccessToken };
