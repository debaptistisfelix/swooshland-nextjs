// Function to fetch Items data from server 

export default async function getItemData(id){
  const baseUrl =  `https://${process.env.VERCEL_URL}`  || `${process.env.BASE_URL}` 
    const response = await fetch(`${baseUrl}/api/item/${id}`, {cache: 'no-store'})
    console.log("Single item - response: ", response)
    console.log("Single item - responseOK: ", response.ok)
    console.log("Single item - responseStatus: ", response.status)
    if(!response.ok){
      throw new Error("Error while requesting Item from server")
    }
    const data = await response.json()
    return data
  }