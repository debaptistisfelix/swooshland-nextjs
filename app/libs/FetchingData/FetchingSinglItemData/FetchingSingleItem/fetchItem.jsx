// Function to fetch Items data from server 

export default async function getItemData(id){
  const baseUrl = process.env.VERCEL_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/item/${id}`, {cache: 'no-store'})
    if(!response.ok){
      throw new Error("Error while requesting Item from server")
    }
    const data = await response.json()
    return data
  }