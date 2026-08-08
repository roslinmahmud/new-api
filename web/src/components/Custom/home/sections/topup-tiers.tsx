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

import { Button } from '@/components/ui/button'
import { formatLocalCurrencyAmount } from '@/lib/currency'
import { cn } from '@/lib/utils'

import type { TopupTier } from '../hooks/use-custom-home-info'

interface TopupTiersProps {
  isAuthenticated: boolean
  tiers: TopupTier[]
  price: number
}

export function TopupTiers(props: TopupTiersProps) {
  const { t } = useTranslation()
  const [selectedIndex, setSelectedIndex] = useState(() =>
    props.tiers.length > 2 ? 2 : 0
  )

  if (props.tiers.length === 0) {
    return null
  }

  const selected = props.tiers[selectedIndex] ?? props.tiers[0]
  const selectedPayable = formatLocalCurrencyAmount(selected.payable)
  const effectiveRate = formatLocalCurrencyAmount(
    selected.payable / selected.amount
  )

  return (
    <section
      id='pricing'
      className='border-border bg-muted/40 border-y py-12 md:py-20'
    >
      <div className='mx-auto max-w-6xl px-6'>
        <span className='text-primary mb-2.5 block text-xs font-semibold tracking-[0.12em] uppercase'>
          {t('Wallet top-up')}
        </span>
        <h2 className='text-[clamp(1.625rem,3.2vw,2.5rem)] leading-tight font-bold tracking-tight'>
          {t('Pick an amount, spend it however you like')}
        </h2>
        <p className='text-muted-foreground mt-2 mb-8 max-w-[58ch]'>
          {t(
            'Every top-up lands in the same wallet. Choose one to see exactly what you get.'
          )}
        </p>

        <div className='grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]'>
          {/* Tier buttons */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            {props.tiers.map((tier, index) => (
              <button
                key={tier.amount}
                type='button'
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  'bg-background flex cursor-pointer flex-col gap-1.5 rounded-2xl border-2 p-4.5 text-left shadow-xs transition hover:-translate-y-0.5 hover:shadow-md',
                  index === selectedIndex ? 'border-primary' : 'border-border'
                )}
              >
                <span className='flex items-center justify-between gap-2'>
                  <span className='text-muted-foreground text-[11px] font-semibold tracking-[0.1em] uppercase'>
                    {t('Top up')}
                  </span>
                  {tier.discount < 1 && (
                    <span className='bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[9px] font-bold'>
                      {t('Save {{percent}}%', {
                        percent: Math.round((1 - tier.discount) * 100),
                      })}
                    </span>
                  )}
                </span>
                <span className='text-[32px] leading-tight font-extrabold tracking-tight'>
                  ${tier.amount}
                </span>
                <span className='text-primary text-[13px] font-semibold'>
                  {formatLocalCurrencyAmount(tier.payable)}
                </span>
                <span className='text-muted-foreground text-xs'>
                  {t('Credited instantly, spend anytime')}
                </span>
              </button>
            ))}
          </div>

          {/* Selected tier summary */}
          <div className='border-border bg-background rounded-2xl border p-5.5 shadow-md lg:sticky lg:top-24'>
            <span className='text-muted-foreground text-[11px] font-semibold tracking-[0.12em] uppercase'>
              {t('Your top-up')}
            </span>
            <div className='mt-3 flex items-baseline gap-2.5'>
              <span className='text-[40px] font-extrabold tracking-tight'>
                ${selected.amount}
              </span>
              <span className='text-muted-foreground text-[15px] font-semibold'>
                {t('credited')}
              </span>
            </div>
            <div className='text-primary mt-0.5 text-sm font-semibold'>
              {t('You pay {{payable}}', { payable: selectedPayable })}
            </div>
            <div className='border-border mt-4.5 grid gap-2.5 border-t border-dashed pt-4 text-[13px]'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>
                  {t('Effective rate')}
                </span>
                <span className='font-semibold'>{effectiveRate} / $1</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>{t('Expires')}</span>
                <span className='font-semibold'>{t('Never')}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>
                  {t('Free models')}
                </span>
                <span className='font-semibold'>{t('Still free')}</span>
              </div>
            </div>
            <Button
              className='mt-5 h-12 w-full rounded-full text-[15px] font-semibold shadow-lg'
              render={
                <Link to={props.isAuthenticated ? '/wallet' : '/sign-up'} />
              }
            >
              {t('Add {{payable}} to wallet', { payable: selectedPayable })}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
