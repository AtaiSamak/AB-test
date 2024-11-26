import styles from './Select.module.scss'
import SelectButton from './SelectButton/SelectButton.tsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchUserList } from '../../api/user.ts'
import { User, UserList } from '../../types/user.ts'
import SelectItem from './SelectItem/SelectItem.tsx'
import useOnClickOutside from '../../hooks/useOnClickOutside.ts'
import Window from '../Window/Window.tsx'

const LIMIT = 50

const Select = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [selected, setSelected] = useState<User | null>(null)
  const [users, setUsers] = useState<UserList>([])

  const fetchParams = useRef({
    hasMorePage: true,
    page: 1,
    isLoading: false,
  })

  const fetchUsers = useCallback(async () => {
    if (fetchParams.current.isLoading || !fetchParams.current.hasMorePage) return
    fetchParams.current.isLoading = true

    const response = await fetchUserList(fetchParams.current.page, LIMIT)

    if (response.data.length) {
      setUsers((prevState) => [...prevState, ...response.data])
      fetchParams.current.page += 1
    }
    if (response.meta.to >= response.meta.total) {
      fetchParams.current.hasMorePage = false
    }
    fetchParams.current.isLoading = false
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [])

  const ref = useOnClickOutside<HTMLDivElement>(() => setIsDropdownOpen(false))

  return (
    <div className={styles.container} ref={ref}>
      <SelectButton
        selected={selected}
        onClick={() => setIsDropdownOpen(true)}
        isActive={isDropdownOpen}
      />
      {isDropdownOpen && (
        <Window className={styles.dropdown} rowHeight={32} onReachBottom={fetchUsers}>
          {users.map((user) => (
            <SelectItem
              key={user.id}
              isSelected={selected?.id === user.id}
              user={user}
              onClick={() => {
                setSelected(user)
                setIsDropdownOpen(false)
              }}
            />
          ))}
        </Window>
      )}
    </div>
  )
}

export default Select
