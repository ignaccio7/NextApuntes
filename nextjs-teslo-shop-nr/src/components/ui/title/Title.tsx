import { titleFont } from "@/config/fonts"

interface Props {
  title: string,
  subtitle?: string
  className?: string
}

export function Title({ title, subtitle, className }:Props) {
  return(
    <div className={` ${className} mt-3`}>
      <h1 className={ ` ${titleFont.className} antialiased text-4xl font-semibold my-10` }>
        { title }
      </h1>     
      {
        subtitle && (
          <h3 className="text-xl mb-5 font-semibold">
            {subtitle}
          </h3>
        )
      }
    </div>
  )
}