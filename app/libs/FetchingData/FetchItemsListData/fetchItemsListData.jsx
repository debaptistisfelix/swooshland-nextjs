// Function to fetch sneakers list data from server 

export default async function getItemsListData(tag){
  let baseUrl;

  if(process.env.NODE_ENV === 'development'){
    baseUrl =  `${process.env.BASE_URL}`
  } else {
    baseUrl =  `https://${process.env.VERCEL_URL}`  
  }
    const response = await fetch(`/api/item`, {
      cache: "no-store",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    if(!response.ok){
      throw new Error("Error while requesting Sneakers from server")
    }
    const data = await response.json()
    const filteredData = data.filter(item => item.tag === tag).reverse();
    return filteredData
  }