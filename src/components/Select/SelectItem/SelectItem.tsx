import styles from './SelectItem.module.scss'
import { User } from '../../../types/user.ts'
import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

type SelectDropdownProps = {
  isSelected: boolean
  user: User
  onClick: () => void
} & HTMLAttributes<HTMLDivElement>

const SelectItem: FC<SelectDropdownProps> = ({ isSelected, user, onClick, ...props }) => {
  return (
    <div
      className={classNames(styles.item, isSelected && styles.itemSelected)}
      onClick={onClick}
      {...props}
    >
      <div className={styles.avatar}>{user.last_name[0]}</div>
      <div className={styles.text}>{`${user.last_name} ${user.first_name}, ${user.job}`}</div>
    </div>
  )
}

export default SelectItem
