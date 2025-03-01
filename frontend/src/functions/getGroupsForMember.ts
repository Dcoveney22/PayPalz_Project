export async function getGroupsForMember(username: string, token: string) {
  const response = await fetch(
    `http://localhost:3000/groups?username=${username}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  if (!response.ok) throw new Error(response.statusText)
  return await response.json()
}
