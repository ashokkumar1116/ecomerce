// import { useContext } from 'react';
// import CategoryPreview from '../../components/category-preview/category-preview.component';
// import { CategoriesContext } from '../../contexts/categories.context';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import Category from '../category/category.component';
import './shop.styles.scss';


const Shop = () => {
    // const categoriesMap = useContext(CategoriesContext)

    return (
        <Routes>
            <Route index element={<CategoriesPreview /> } />
            <Route path=':category' element={<Category /> } />
        </Routes>
        // <div className='shop-container'>
        //          {
        //             Object.keys(categoriesMap.categoriesMap).map(title => {
        //                 const products = categoriesMap.categoriesMap[title]
        //                 return <CategoryPreview key={title} title={title} products={products} />
        //             })
        //     }
        // </div>
    );
}

export default Shop;