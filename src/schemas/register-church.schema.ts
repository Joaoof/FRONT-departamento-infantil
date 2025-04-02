import { z } from 'zod'

export const registerChurchSchema = z.object({
  churchName: z.string().min(1, { message: 'Church name is required' }),
  pastorName: z.string().min(1, { message: 'Pastor name is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  address: z.string().min(1, { message: 'Address is required' }),
})

export type RegisterChurchSchema = z.infer<typeof registerChurchSchema>
