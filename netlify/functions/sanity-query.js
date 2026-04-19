const DEFAULT_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'c7mgn6k7';
const DEFAULT_DATASET = process.env.SANITY_DATASET || 'production';
const DEFAULT_API_VER = '2024-01-01';

function json(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: JSON.stringify(payload)
  };
}

exports.handler = async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed' });
  }

  try {
    const params = event.queryStringParameters || {};
    const query = params.query || '';
    const projectId = params.projectId || DEFAULT_PROJECT_ID;
    const dataset = params.dataset || DEFAULT_DATASET;
    const apiVer = params.apiVer || DEFAULT_API_VER;
    const preview = params.preview === 'true';
    const token = params.token || '';

    if (!query) {
      return json(400, { error: 'Missing query parameter' });
    }

    const host = preview
      ? `https://${projectId}.api.sanity.io`
      : `https://${projectId}.apicdn.sanity.io`;

    let url = `${host}/v${apiVer}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
    if (preview) {
      url += '&perspective=previewDrafts';
    }

    const headers = {};
    if (preview && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, { headers });
    const body = await response.text();

    if (!response.ok) {
      return json(response.status, {
        error: 'Sanity request failed',
        status: response.status,
        details: body
      });
    }

    const data = JSON.parse(body);
    return json(200, data);
  } catch (error) {
    return json(500, {
      error: 'Unexpected proxy error',
      details: error && error.message ? error.message : String(error)
    });
  }
};
