
export async function getGroupsForMember(username: string) {
    const response = await fetch(
      `http://localhost:3000/groups?username=${username}`
    )
    if (!response.ok) throw new Error(response.statusText)
    return await response.json()
  }