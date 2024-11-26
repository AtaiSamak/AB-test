import { UserList } from '../types/user.ts'

export const fetchUserList = async (
  page: number,
  limit: number,
): Promise<{
  data: UserList
  meta: {
    from: number
    to: number
    total: number
  }
}> => {
  const response = await fetch(
    `https://frontend-test-middle.vercel.app/api/users?page=${page}&limit=${limit}`,
  )
  return await response.json()
}
