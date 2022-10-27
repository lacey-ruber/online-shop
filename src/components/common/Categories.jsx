import '../../scss/components/_filters.scss'

const Categories = ({
  items,
  selectedItem,
  onItemSelect,
  setClearFilterAll,
}) => {
  return (
    <ul onClick={() => setClearFilterAll(false)}>
      {items.map((item, index) => (
        <li
          key={index}
          className={item === selectedItem ? 'active' : ''}
          onClick={() => onItemSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default Categories
