import styles from './SelectButton.module.scss'
import { User } from '../../../types/user.ts'
import { FC } from 'react'
import Arrow from '../../../assets/svg/Arrow.tsx'
import classNames from 'classnames'

type SelectButtonProps = {
  selected: User | null
  onClick: () => void
  isActive?: boolean
}

const SelectButton: FC<SelectButtonProps> = ({ selected, onClick, isActive }) => {
  return (
    <div
      className={classNames(styles.container, isActive && styles.containerActive)}
      onClick={onClick}
    >
      {selected ? `${selected.last_name} ${selected.first_name}, ${selected.job}` : 'Select User'}
      <Arrow className={styles.arrow} />
    </div>
  )
}

export default SelectButton
