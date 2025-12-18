// services/api.ts
export async function estimatePrice(data: any) {
  const res = await fetch("http://localhost:8001/api/estimate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return res.json();
}
