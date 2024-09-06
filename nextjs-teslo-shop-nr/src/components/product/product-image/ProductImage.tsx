
interface Props{
  className?: string
  url?: string
  alt: string
}

export function ProductImage({className, url="", alt }:Props) {
  console.log(url);
  
  const newUrl = url !== "" 
    ? url.startsWith('http')
      ? url
      : `/products/${url}`
    : "http://localhost:3000/imgs/starman_750x750.png"

  return (
    <img
      src={newUrl}
      alt={`Imagen del producto ${alt}`}
      className={className}
    />
  );
}
