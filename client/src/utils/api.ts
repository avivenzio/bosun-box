import config from "../../config/config.json";

export async function hwApi<T>(
  path: string,
  method = "GET",
  data?: any
): Promise<T> {
  const url = `http://${window.location.hostname}:${config.hardwareService.port}${path}`;
  try {
    const response = await fetch(url, {
      method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) {
      throw new Error("Error Response");
    }
    return response.json();
  } catch (err) {
    throw new Error("Fetch Error");
  }
}
