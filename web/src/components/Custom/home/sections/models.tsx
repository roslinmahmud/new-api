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
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { formatPrice } from '@/features/pricing/lib/price'
import type { PricingModel, TokenUnit } from '@/features/pricing/types'
import { cn } from '@/lib/utils'

import { isFreeModel } from '../lib'

interface ModelsProps {
  models: PricingModel[]
  totalModelCount: number
}

export function Models(props: ModelsProps) {
  const { t } = useTranslation()
  const [unit, setUnit] = useState<TokenUnit>('M')

  if (props.models.length === 0) {
    return null
  }

  const unitOptions: { value: TokenUnit; label: string }[] = [
    { value: 'M', label: t('per 1M') },
    { value: 'K', label: t('per 1K') },
  ]

  return (
    <section
      id='models'
      className='border-border bg-muted/40 border-y py-12 md:py-20'
    >
      <div className='mx-auto max-w-6xl px-6'>
        <div className='mb-6 flex flex-wrap items-end justify-between gap-5'>
          <div>
            <span className='text-primary mb-2.5 block text-xs font-semibold tracking-[0.12em] uppercase'>
              {t('Model square')}
            </span>
            <h2 className='mb-2 text-[clamp(1.625rem,3.2vw,2.5rem)] leading-tight font-bold tracking-tight'>
              {t('Choose from {{count}} models, priced per token', {
                count: props.totalModelCount,
              })}
            </h2>
            <p className='text-muted-foreground max-w-[56ch]'>
              {t(
                'All paid models draw from the same wallet. Free models never touch it.'
              )}
            </p>
          </div>
          <div className='border-border bg-background flex gap-0.5 rounded-full border p-1'>
            {unitOptions.map((option) => (
              <button
                key={option.value}
                type='button'
                onClick={() => setUnit(option.value)}
                className={cn(
                  'cursor-pointer rounded-full px-4 py-2 text-[13px] font-semibold transition',
                  unit === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {props.models.map((model) => {
            const free = isFreeModel(model)
            return (
              <div
                key={model.model_name}
                className='border-border bg-background flex flex-col gap-2.5 rounded-2xl border p-4.5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md'
              >
                <div className='flex items-center gap-2.5'>
                  <span className='bg-primary/10 text-primary flex size-7.5 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold uppercase'>
                    {model.model_name.charAt(0)}
                  </span>
                  <span className='min-w-0 flex-1 truncate text-[14.5px] font-bold tracking-tight'>
                    {model.model_name}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 rounded-full border px-2 py-0.5 text-[9.5px] font-semibold',
                      free
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'border-border text-muted-foreground'
                    )}
                  >
                    {free ? t('Free') : t('Wallet')}
                  </span>
                </div>
                {model.description && (
                  <p className='text-muted-foreground line-clamp-2 min-h-0 flex-1 text-[13px] leading-relaxed'>
                    {model.description}
                  </p>
                )}
                <div className='border-border flex gap-4 border-t pt-2.5 text-[12.5px]'>
                  <span className='text-muted-foreground'>
                    {t('Input')}{' '}
                    <strong className='text-foreground tabular-nums'>
                      {free ? t('Free') : formatPrice(model, 'input', unit)}
                    </strong>
                  </span>
                  <span className='text-muted-foreground'>
                    {t('Output')}{' '}
                    <strong className='text-foreground tabular-nums'>
                      {free ? t('Free') : formatPrice(model, 'output', unit)}
                    </strong>
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
          <p className='text-muted-foreground text-xs'>
            {unit === 'M'
              ? t('Prices shown per 1M tokens.')
              : t('Prices shown per 1K tokens.')}
          </p>
          <Link
            to='/pricing'
            className='text-primary text-sm font-semibold hover:underline'
          >
            {t('View all pricing')} →
          </Link>
        </div>
      </div>
    </section>
  )
}
