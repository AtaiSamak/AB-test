import styles from './Select.module.scss'
import SelectButton from './SelectButton/SelectButton.tsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchUserList } from '../../api/user.ts'
import { User, UserList } from '../../types/user.ts'
import SelectDropdown from './SelectDropdown/SelectDropdown.tsx'
import useInfiniteScroll from '../../hooks/useInfiniteScroll.ts'
import useOnClickOutside from '../../hooks/useOnClickOutside.ts'

const LIMIT = 50

const Select = () => {
  const dropdownRef = useRef<HTMLDivElement>(null)
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
    if (response.meta.to >= response.meta.total) {
      fetchParams.current.hasMorePage = false
    } else {
      setUsers((prevState) => [...prevState, ...response.data])
      fetchParams.current.page += 1
    }

    fetchParams.current.isLoading = false
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [])

  useInfiniteScroll(fetchUsers, 300, dropdownRef)

  const ref = useOnClickOutside<HTMLDivElement>(() => setIsDropdownOpen(false))

  return (
    <div className={styles.container} ref={ref}>
      <SelectButton
        selected={selected}
        onClick={() => setIsDropdownOpen(true)}
        isActive={isDropdownOpen}
      />
      {isDropdownOpen && (
        <SelectDropdown
          selected={selected}
          users={users}
          ref={dropdownRef}
          onClick={(user) => {
            setSelected(user)
            setIsDropdownOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default Select
