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
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getCustomHomeInfo } from '../api'

export type TopupTier = {
  amount: number
  discount: number
  payable: number
}

export function useCustomHomeInfo() {
  const { data, isLoading } = useQuery({
    queryKey: ['custom-home-info'],
    queryFn: getCustomHomeInfo,
    staleTime: 5 * 60 * 1000,
  })

  const price = Math.max(data?.price ?? 1, 0.001)

  const tiers = useMemo<TopupTier[]>(() => {
    const options = data?.amount_options ?? []
    const discounts = data?.amount_discount ?? {}
    return options.map((amount) => {
      const rawDiscount = discounts[amount]
      const discount = rawDiscount && rawDiscount > 0 ? rawDiscount : 1
      return {
        amount,
        discount,
        payable: amount * price * discount,
      }
    })
  }, [data, price])

  return {
    tiers,
    price,
    minTopup: data?.min_topup ?? 1,
    isLoading,
  }
}
