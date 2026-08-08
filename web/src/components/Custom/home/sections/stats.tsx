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
import { useTranslation } from 'react-i18next'

import { formatLocalCurrencyAmount } from '@/lib/currency'

interface StatsProps {
  price: number
  freeModelCount: number
}

export function Stats(props: StatsProps) {
  const { t } = useTranslation()

  const cells = [
    {
      value: formatLocalCurrencyAmount(props.price),
      label: t('Roughly one US dollar'),
    },
    {
      value: String(props.freeModelCount),
      label: t('Models free forever'),
    },
    {
      value: '0',
      label: t('Session or weekly limits'),
    },
    {
      value: '∞',
      label: t('Balance never expires'),
    },
  ]

  return (
    <section className='mx-auto max-w-6xl px-6 pt-6 pb-12 md:pb-16'>
      <div className='border-border bg-border grid grid-cols-2 gap-px overflow-hidden rounded-2xl border md:grid-cols-4'>
        {cells.map((cell) => (
          <div key={cell.label} className='bg-background px-5 py-5'>
            <div className='text-primary text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold tracking-tight'>
              {cell.value}
            </div>
            <div className='text-muted-foreground mt-1.5 text-xs'>
              {cell.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
