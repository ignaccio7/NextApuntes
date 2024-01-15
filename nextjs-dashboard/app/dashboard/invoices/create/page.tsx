// // Server Component
// export default function Page() {
//     // Action
//     async function create(formData: FormData) {
//       'use server';
   
//       // Logic to mutate data...
//       // aqui lo que se podria hacer es un fetch o lo que queiras
//       /*fetch('/api/users',{
//         method:'POST',
//         body: formData
//       })*/
//     }
   
//     // Invoke the action using the "action" attribute
//     return <form action={create}>...</form>;
//   }

import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}