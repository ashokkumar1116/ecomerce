import { Fragment, useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../contexts/categories.context';


const CategoriesPreview = () => {
  const categoriesMap = useContext(CategoriesContext)

  return (
    <Fragment>
      {
        Object.keys(categoriesMap.categoriesMap).map(title => {
          const products = categoriesMap.categoriesMap[title]
          return <CategoryPreview key={title} title={title} products={products} />
        })
      }
    </Fragment>
  );
}

export default CategoriesPreview;