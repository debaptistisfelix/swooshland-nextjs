// Function to fetch sneakers list data from server 

export default async function getItemsListData(tag){
  const baseUrl =  `https://${process.env.VERCEL_URL}`  || `${process.env.BASE_URL}` 
    const response = await fetch(`${baseUrl}/api/item`)
    console.log("response: ", response)
    console.log("responseOK: ", response.ok)
    console.log("responseStatus: ", response.status)
    if(!response.ok){
      throw new Error("Error while requesting Sneakers from server")
    }
    const data = await response.json()
    const filteredData = data.filter(item => item.tag === tag).reverse();
    return filteredData
  }