import '../../scss/components/_filters.scss'

const Sort = ({ onSort, selectedSort }) => {
  const items = {
    rating: { path: 'rating.rate', name: 'Popularity' },
    price: { path: 'price', name: 'Price' },
    title: { path: 'title', name: 'Alphabet' },
  }
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc',
      })
    } else {
      onSort({ path: item, order: 'asc' })
    }
  }

  const renderSortArrow = (selectedSort, currentPath) => {
    if (selectedSort.path === currentPath) {
      if (selectedSort.order === 'asc') {
        return <i>↓</i>
      } else {
        return <i>↑</i>
      }
    }
    return null
  }

  return (
    <div className='sort'>
      <div className='sort__label'>
        <b>Сортировать по:</b>
        {Object.keys(items).map((item) => (
          <span
            key={item}
            className={selectedSort.path === items[item].path ? 'active' : ''}
            onClick={() => handleSort(items[item].path)}
          >
            {items[item].name}
            {renderSortArrow(selectedSort, items[item].path)}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Sort
