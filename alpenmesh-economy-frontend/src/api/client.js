const BASE = '/api/v1/economy'

async function request(path, options = {}) {
  const url = `${BASE}${path}`
  const { headers: userHeaders = {}, ...rest } = options
  const res = await fetch(url, {
    ...rest,
    headers: { 'Content-Type': 'application/json', ...userHeaders },
  })

  let payload = {}
  try {
    payload = await res.json()
  } catch {
    // non-JSON response
  }

  if (!res.ok) {
    throw new ApiError(payload?.message || `Request failed (${res.status})`, res.status, payload)
  }

  return payload?.data !== undefined ? payload.data : payload
}

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message)
    this.status = status
    this.payload = payload
  }
}

export const client = {
  get: (path, headers = {}) => request(path, { method: 'GET', headers }),
  post: (path, body, headers = {}) =>
    request(path, { method: 'POST', body: JSON.stringify(body), headers }),
  put: (path, body, headers = {}) =>
    request(path, { method: 'PUT', body: JSON.stringify(body), headers }),
  patch: (path, body, headers = {}) =>
    request(path, { method: 'PATCH', body: JSON.stringify(body), headers }),
  delete: (path, headers = {}) => request(path, { method: 'DELETE', headers }),
}
