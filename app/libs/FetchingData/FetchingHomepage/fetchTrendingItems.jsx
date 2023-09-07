// fetch trending items fro homepage

export default async function getTrendingItems() {
  const baseUrl = `${process.env.BASE_URL}` || `https://${process.env.VERCEL_URL}` 
  /* const response = await fetch(`${baseUrl}/api/item`); */
  const response = await fetch(`${baseUrl}/api/item`);
  if (!response.ok) {
    throw new Error("Error while fetching item");
  }
  const data = await response.json();
  return data.slice(0, 6);
}