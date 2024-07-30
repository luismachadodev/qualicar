import { redirect } from "next/navigation"

export async function getDataHome() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects/669f022ad70e5c5cd3fa4f4f?read_key=${process.env.READ_KEY}&depth=1&props=slug,title,metadata`, { next: { revalidate: 120 } })

    if (!res.ok) {
      throw new Error("failed to fetch data")
    }

    return res.json()
  } catch (error) {
    throw new Error("failed to fetch data")
  }
}

export async function getSubMenu() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects?pretty=true&query=%7B%22type%22:%22pages%22%7D&limit=10&read_key=${process.env.READ_KEY}&depth=1&props=slug,title`, { next: { revalidate: 120 } })

    if (!res.ok) {
      throw new Error("Failed to fetch menu data")
    }

    return res.json()
  } catch (error) {
    throw new Error("Failed to fetch menu data")
  }
}

export async function getItemBySlug(itemSug: string) {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/objects`

  const queryParams = new URLSearchParams({
    query: JSON.stringify({
      slug: itemSug
    }),
    props: 'slug, title, content, metadata',
    read_key: process.env.READ_KEY as string
  })

  const url = `${baseUrl}?${queryParams.toString()}`

  try {
    const res = await fetch(url, { next: { revalidate: 120 } })
    
    if (!res.ok) {
      throw new Error("failed get item by slug")

    }

    return res.json()
  } catch (error) {
    console.log(error)
    redirect("/")
  }
}