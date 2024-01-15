'use server'

// 🆙 con esto marcamos que todas las funciones que se exportan en este archivo son de servidor
// por tanto nose ejecuta ni se envie al cliente

import { custom, z } from 'zod'
import { Invoice } from './definitions';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const CreateInvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string()
})

const CreateInvoiceFormSchema = CreateInvoiceSchema.omit({
    id: true,
    date: true
})

export async function createInvoice(formData: FormData) {
    // console.log('createInvoice',formData);
    // const rawFormData = {
    //     customerId: formData.get('customerId'),
    //     amount: formData.get('amount'),
    //     status: formData.get('status')
    // }
    // si esque tuviermos muchos datos podriamos hacerlo como
    // const rawFormData = Object.entries(formData.entries())

    // console.log(rawFormData);

    const { customerId, amount, status } = CreateInvoiceFormSchema.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    })

    // lo transformamos para evitar errores de redondeo
    const amountInCents = amount * 100
    // creamos la fecha actual 2023-11-25 año mes dia
    const [date] = new Date().toISOString().split('T')

    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `
    // para indicarle que ruta luego de hacer esto refresque los datos
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')

}