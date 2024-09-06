// Archivo de barril de components


/************************** UI  */
/** TOPMENU  */
export { TopMenu } from "./ui/top-menu/topMenu";
/** SIDEBAR  */
export * from './ui/sidebar/Sidebar'

/** NOTFOUND  */
export { PageNotFound } from "./ui/not-found/PageNotFound"

/** TITLE  */
export { Title } from "./ui/title/Title"

/** PAGINATION  */
export { Pagination } from "./ui/pagination/Pagination"

/************************** PRODUCTS - GRID   */
/** PRODUCTS - GRID  */
export { ProductGrid } from "./products/product-grid/ProductGrid"
/** PRODUCTS - ITEM  */
export * from "./products/product-grid/ProductGridItem"

/** Footer  */
export * from "./ui/footer/Footer"


/************************** PRODUCT - GRID   */
/** SIZE - SELECTOR  */
export * from "./product/size-selector/SizeSelector"
/** QUANTITY - SELECTOR  */
export * from "./product/quantity-selector/QuantitySelector"
/** STOCK - LABEL  */
export * from "./product/stock-label/StockLabel"
/** SLIDESHOW  */
export * from "./product/slideshow-images/SlideShow"
export * from "./product/slideshow-images/MobileSlideShow"

/** PRODUCTS - IMAGE  */
export * from "./product/product-image/ProductImage"



/************************** AUTH - PROVIDER   */
/** Para tener la informacion del usuario de lado del cliente  */
export * from './provider/AuthProvider'


