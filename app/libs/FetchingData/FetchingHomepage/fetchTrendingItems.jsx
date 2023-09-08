// fetch trending items fro homepage

export default async function getTrendingItems() {
 const baseUrl =  `https://${process.env.VERCEL_URL}`  || `${process.env.BASE_URL}` 
  const response = await fetch(`/api/item`);
  console.log("Resposnse: ", response.status)
  if (!response.ok) {
    throw new Error("Error while fetching item");
  }
  const data = await response.json();
  console.log(data)
  return data.slice(0, 6);
}