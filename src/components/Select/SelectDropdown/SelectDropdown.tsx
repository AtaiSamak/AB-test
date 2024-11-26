import styles from './SelectDropdown.module.scss'
import { User, UserList } from '../../../types/user.ts'
import { forwardRef } from 'react'
import classNames from 'classnames'

type SelectDropdownProps = {
  selected?: User | null
  users: UserList
  onClick: (user: User) => void
}

const SelectDropdown = forwardRef<HTMLDivElement, SelectDropdownProps>(
  ({ selected, users, onClick }, ref) => {
    return (
      <div className={styles.container} ref={ref}>
        {users.map((item) => (
          <div
            className={classNames(styles.item, selected?.id === item.id && styles.itemSelected)}
            onClick={() => onClick(item)}
          >
            <div className={styles.avatar}>{item.last_name[0]}</div>
            <div className={styles.text}>{`${item.last_name} ${item.first_name}, ${item.job}`}</div>
          </div>
        ))}
      </div>
    )
  },
)

export default SelectDropdown
