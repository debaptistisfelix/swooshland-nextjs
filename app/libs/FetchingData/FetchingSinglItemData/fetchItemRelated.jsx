//fetching the related items of a single item

export default async function getItemRelated(id){
   /*  await new Promise(resolve => setTimeout(resolve, 3000)) */
    const baseUrl = process.env.BASE_URL
    const response = await fetch(`${baseUrl}/api/item/related/${id}`)
    if(!response.ok){
      throw new Error("Error while fetching item")
    }
    const data = await response.json()
    return data
}