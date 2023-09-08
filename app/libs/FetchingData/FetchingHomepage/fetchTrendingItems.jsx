// fetch trending items fro homepage

export default async function getTrendingItems() {
 const baseUrl =  `https://${process.env.VERCEL_URL}`  || `${process.env.BASE_URL}` 
  const response = await fetch(`${baseUrl}/api/item/trending`);
  console.log("TRENDING-response: ", response.status)
  console.log("TRENDING-response: ", response)
  console.log("TRENDING-responseOK: ", response.ok)
  if (!response.ok) {
    throw new Error("Error while fetching item");
  }
  const data = await response.json();
  console.log(data)
  return data;
}