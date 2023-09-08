// fetch trending items fro homepage

export default async function getTrendingItems() {
 const baseUrl =  `https://${process.env.VERCEL_URL}`  || `${process.env.BASE_URL}` 
  const response = await fetch(`${baseUrl}/api/item/trending`, {
    cache: "no-store",
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });
  console.log("TRENDING-response: ", response.status)
  console.log("TRENDING-response: ", response)
  console.log("TRENDING-responseOK: ", response.ok)
  console.log("TRENDING-responseBody: ", response.body)
  if (!response.ok) {
    throw new Error("Error while fetching item");
  }
  const data = await response.json();
  console.log(data)
  return data;
}