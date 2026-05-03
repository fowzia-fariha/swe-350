// // // const API_BASE = "http://localhost:5000/api";

// // // export async function apiGet(path) {
// // //   const response = await fetch(`${API_BASE}${path}`);
// // //   if (!response.ok) throw new Error(`GET ${path} failed`);
// // //   return response.json();
// // // }

// // // export async function apiPost(path, body, isForm = false) {
// // //   const response = await fetch(`${API_BASE}${path}`, {
// // //     method: "POST",
// // //     headers: isForm ? {} : { "Content-Type": "application/json" },
// // //     body: isForm ? body : JSON.stringify(body),
// // //   });
// // //   if (!response.ok) {
// // //     const error = await response.json().catch(() => ({}));
// // //     throw new Error(error.message || `POST ${path} failed`);
// // //   }
// // //   return response.json();
// // // }



// // const API_BASE = "http://localhost:5000/api";

// // /* =========================
// //    GET REQUEST
// // ========================= */
// // export async function apiGet(path) {
// //   try {
// //     const response = await fetch(`${API_BASE}${path}`);

// //     const data = await response.json().catch(() => ({}));

// //     if (!response.ok) {
// //       throw new Error(data.error || data.message || `GET ${path} failed`);
// //     }

// //     return data;
// //   } catch (err) {
// //     console.error("API GET Error:", err.message);
// //     throw err;
// //   }
// // }

// // /* =========================
// //    POST REQUEST
// // ========================= */
// // export async function apiPost(path, body, isForm = false) {
// //   try {
// //     const response = await fetch(`${API_BASE}${path}`, {
// //       method: "POST",
// //       headers: isForm
// //         ? {}
// //         : { "Content-Type": "application/json" },
// //       body: isForm ? body : JSON.stringify(body),
// //     });

// //     const data = await response.json().catch(() => ({}));

// //     if (!response.ok) {
// //       throw new Error(data.error || data.message || `POST ${path} failed`);
// //     }

// //     return data;
// //   } catch (err) {
// //     console.error("API POST Error:", err.message);
// //     throw err;
// //   }
// // }

// // /* =========================
// //    PUT REQUEST
// // ========================= */
// // export async function apiPut(path, body) {
// //   try {
// //     const response = await fetch(`${API_BASE}${path}`, {
// //       method: "PUT",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(body),
// //     });

// //     const data = await response.json().catch(() => ({}));

// //     if (!response.ok) {
// //       throw new Error(data.error || data.message || `PUT ${path} failed`);
// //     }

// //     return data;
// //   } catch (err) {
// //     console.error("API PUT Error:", err.message);
// //     throw err;
// //   }
// // }

// // /* =========================
// //    DELETE REQUEST
// // ========================= */
// // export async function apiDelete(path) {
// //   try {
// //     const response = await fetch(`${API_BASE}${path}`, {
// //       method: "DELETE",
// //     });

// //     const data = await response.json().catch(() => ({}));

// //     if (!response.ok) {
// //       throw new Error(data.error || data.message || `DELETE ${path} failed`);
// //     }

// //     return data;
// //   } catch (err) {
// //     console.error("API DELETE Error:", err.message);
// //     throw err;
// //   }
// // }


// const API_BASE = "http://localhost:5000/api";

// // GET request
// export async function apiGet(path) {
//   try {
//     const response = await fetch(`${API_BASE}${path}`);

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText || `GET ${path} failed`);
//     }

//     return await response.json();
//   } catch (err) {
//     console.error("GET error:", err);
//     throw new Error("Network error");
//   }
// }

// // POST request
// export async function apiPost(path, body = {}, isForm = false) {
//   try {
//     const response = await fetch(`${API_BASE}${path}`, {
//       method: "POST",
//       headers: isForm
//         ? {}
//         : { "Content-Type": "application/json" },
//       body: isForm ? body : JSON.stringify(body),
//     });

//     const data = await response.json().catch(() => ({}));

//     if (!response.ok) {
//       throw new Error(data.error || data.message || `POST ${path} failed`);
//     }

//     return data;
//   } catch (err) {
//     console.error("POST error:", err);
//     throw new Error("Network error. Backend not reachable.");
//   }
// }


const API_BASE = "http://localhost:5000/api";

// GET
export async function apiGet(path) {
  try {
    const response = await fetch(`${API_BASE}${path}`);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `GET ${path} failed`);
    }

    return await response.json();
  } catch (err) {
    console.error("GET ERROR:", err);
    throw new Error("Network error");
  }
}

// POST
export async function apiPost(path, body = {}, isForm = false) {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: isForm
        ? {}
        : { "Content-Type": "application/json" }, // ✅ THIS WAS MISSING
      body: isForm ? body : JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || data.message || "Request failed");
    }

    return data;
  } catch (err) {
    console.error("POST ERROR:", err);
    throw new Error("Network error. Backend not reachable.");
  }
}