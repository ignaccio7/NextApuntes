import { Suspense } from "react";
import { fetchLatestInvoices, fetchRevenue } from "../lib/data"
import LatestInvoices from "../ui/dashboard/latest-invoices";
import RevenueChart from "../ui/dashboard/revenue-chart";
import { lusitana } from "../ui/fonts";
import { RevenueChartSkeleton } from "../ui/skeletons";

export default async function Page(){
  // un componente que se reenderiza en el servidor puede ser asincrono 
  // asi haremos las peticiones solo en el servidor y eso le devolveremos al usuario
  // eso seria un react server component ya que esta pagina del dashboard se estaria renderizando ahi

  // const res = await fetch('http://api.example.com')
  // const json = await res.json()
  
  // const revenue = await fetchRevenue()
  const lastestInvoices = await fetchLatestInvoices()
  // console.log(revenue);
  

  return(
    // <p>Dashboard Page</p>
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* este es un componente de React que nos dira que este componente es asincrono al cual esperaremos y mientras esperamos cargaremos un fallback */}
        <Suspense fallback={ <RevenueChartSkeleton/> }>
          {/* <RevenueChart revenue={revenue}  /> */}
          <RevenueChart />
        </Suspense>
        <LatestInvoices latestInvoices={lastestInvoices} />
      </div>
    </main>
  )
}