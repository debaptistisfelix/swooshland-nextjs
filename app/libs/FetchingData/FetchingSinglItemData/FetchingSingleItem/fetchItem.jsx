// Function to fetch Items data from server 

export default async function getItemData(id){
  const baseUrl = `${process.env.BASE_URL}` || `https://${process.env.VERCEL_URL}` 
    const response = await fetch(`${baseUrl}/api/item/${id}`, {cache: 'no-store'})
    if(!response.ok){
      throw new Error("Error while requesting Item from server")
    }
    const data = await response.json()
    return data
  }