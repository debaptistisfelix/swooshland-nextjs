// Function to fetch sneakers list data from server 

export default async function getItemsListData(tag){
  const baseUrl = `${process.env.BASE_URL}` || `https://${process.env.VERCEL_URL}` 
    const response = await fetch(`${baseUrl}/api/item`)
    if(!response.ok){
      throw new Error("Error while requesting Sneakers from server")
    }
    const data = await response.json()
    const filteredData = data.filter(item => item.tag === tag).reverse();
    return filteredData
  }