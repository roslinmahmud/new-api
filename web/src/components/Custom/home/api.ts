/*
CUSTOM EXTENSION: Custom homepage (pay-as-you-go landing).

Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { api } from '@/lib/api'

export type CustomHomeInfo = {
  amount_options: number[]
  amount_discount: Record<number, number>
  min_topup: number
  price: number
}

type CustomHomeInfoResponse = {
  success: boolean
  message?: string
  data?: CustomHomeInfo
}

export async function getCustomHomeInfo(): Promise<CustomHomeInfo | null> {
  const res = await api.get<CustomHomeInfoResponse>('/api/custom/home_info')
  if (!res.data?.success || !res.data.data) {
    return null
  }
  return res.data.data
}
