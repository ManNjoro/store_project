const url = 'http://localhost:5000'
export async function loginUser(creds) {
    const res = await fetch(`${url}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await res.json();
  
    if (!res.ok) {
      // eslint-disable-next-line
      throw {
        message: data.message,
        statusText: res.statusText,
        status: res.status,
      };
    }
    return data;
  }

export async function createUser(creds) {
    console.log(creds);
    const res = await fetch(`${url}/signup`, {
        method: "post",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
    });
    const data = await res.json();

    if (!res.ok) {
        // eslint-disable-next-line
        throw {
        message: data.message,
        statusText: res.statusText,
        status: res.status,
        };
    }

    return data;
}

export async function getStores(id) {
    const finalUrl = id ? `${url}/api/stores/${id}` : `${url}/api/stores` 
    const res = await fetch(finalUrl)
    
    if (!res.ok) {
        // eslint-disable-next-line
        throw {
            message: "Failed to fetch stores",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.stores
  }