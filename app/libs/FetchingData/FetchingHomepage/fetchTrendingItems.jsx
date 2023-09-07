// fetch trending items fro homepage

export default async function getTrendingItems() {
  const baseUrl = `https://${process.env.VERCEL_URL}` || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/item`);
  if (!response.ok) {
    throw new Error("Error while fetching item");
  }
  const data = await response.json();
  return data.slice(0, 6);
}