
/****************************** PRODUCTS */
// paginated products
export * from "./products/product-pagination"
// get product by slug
export * from "./products/get-product-by-slug"
// get stock by slug
export * from "./products/get-stock-by-slug"
// create and update product
export * from "./products/create-update-product"


/****************************** AUTH */
// signin
export * from "./auth/login"
// signout
export * from "./auth/logout"
// register
export * from "./auth/register"


/****************************** COUNTRY */
// get countries
export * from "./country/get-countries"

/****************************** ADDRESS */
// save or update address
export * from "./address/set-user-address"
// delete address
export * from "./address/delete-user-address"
// get address
export * from "./address/get-user-address"

/****************************** ORDER */
// place order
export * from "./order/place-order"
// get order by id
export * from "./order/get-order-by-id"
// get orders by user
export * from "./order/get-orders-by-user"
// get paginated order
export * from "./order/get-paginated-orders"

/****************************** USERS */
// get paginated users
export * from "./user/get-paginated-users"
// change role user
export * from "./user/change-user-role"

/****************************** CATEGORY */
// get categories
export * from "./category/get-category"