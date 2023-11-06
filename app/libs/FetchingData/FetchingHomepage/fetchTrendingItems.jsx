// fetch trending items fro homepage

export default async function getTrendingItems() {
  let baseUrl;

  if(process.env.NODE_ENV === 'development'){
    baseUrl =  `${process.env.BASE_URL}`
  } else {
    baseUrl =  `https://${process.env.VERCEL_URL}`  
  }

  const response = await fetch(`${baseUrl}/api/item/trending`, {
    cache: "no-store",
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });
  if (!response.ok) {
    throw new Error("Error while fetching item");
  }
  const data = await response.json();
  console.log(data)
  return data;
}