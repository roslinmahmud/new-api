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
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { formatLocalCurrencyAmount } from '@/lib/currency'

interface HeroProps {
  isAuthenticated: boolean
  /** Local-currency price of one credited unit, used in the floating chip. */
  price: number
  sampleTierAmount?: number
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const sampleAmount = props.sampleTierAmount ?? 5
  const samplePayable = formatLocalCurrencyAmount(sampleAmount * props.price)

  return (
    <section className='relative overflow-hidden px-6 pt-24 pb-12 md:pt-32 md:pb-20'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 opacity-40 dark:opacity-20'
        style={{
          background: [
            'radial-gradient(900px 420px at 78% -10%, oklch(0.62 0.19 255 / 25%), transparent 65%)',
            'radial-gradient(600px 300px at 8% 8%, oklch(0.62 0.19 255 / 10%), transparent 70%)',
          ].join(', '),
        }}
      />

      <div className='mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16'>
        {/* Left: headline + CTAs */}
        <div>
          <span className='border-primary/25 bg-primary/10 text-primary mb-5 inline-flex rounded-full border px-3 py-1 text-xs font-semibold'>
            {t('Pay as you go')}
          </span>
          <h1 className='text-[clamp(2.125rem,5.4vw,4rem)] leading-[1.04] font-extrabold tracking-tight'>
            {t('No plan. No sessions.')}
            <br />
            {t('Just a balance that spends.')}
          </h1>
          <p className='text-muted-foreground mt-5 mb-7 max-w-[52ch] text-[17px] leading-relaxed'>
            {t(
              'Top up your wallet, then spend it request by request across every model. Nothing resets weekly, nothing runs out on a clock.'
            )}
          </p>
          <div className='flex flex-wrap gap-3'>
            <Button
              className='h-12 rounded-full px-6 text-[15px] font-semibold shadow-lg'
              render={<a href='#pricing' />}
            >
              {t('Add funds')}
            </Button>
            <Button
              variant='outline'
              className='h-12 rounded-full px-6 text-[15px]'
              render={
                <Link to={props.isAuthenticated ? '/dashboard' : '/sign-in'} />
              }
            >
              {t('Open dashboard')}
            </Button>
          </div>
          <div className='text-muted-foreground mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[13px]'>
            <span>✓ {t('Balance never expires')}</span>
            <span>✓ {t('Flexible payment methods')}</span>
            <span>✓ {t('One key, every model')}</span>
          </div>
        </div>

        {/* Right: decorative wallet showcase card */}
        <div className='relative'>
          <div
            aria-hidden
            className='bg-primary/20 absolute -inset-4 -z-10 rounded-[2rem] blur-2xl'
          />
          <div className='relative overflow-hidden rounded-3xl bg-linear-160 from-slate-900 via-slate-950 to-blue-950 p-6 text-white shadow-2xl ring-1 ring-white/10 ring-inset md:pb-12 dark:from-slate-800 dark:via-slate-900 dark:to-blue-950'>
            <div
              aria-hidden
              className='absolute -top-16 -right-10 size-56 rounded-full'
              style={{
                background:
                  'radial-gradient(circle, oklch(0.62 0.19 255 / 55%), transparent 65%)',
              }}
            />
            <div
              aria-hidden
              className='absolute -bottom-24 -left-16 size-64 rounded-full'
              style={{
                background:
                  'radial-gradient(circle, oklch(0.62 0.19 255 / 22%), transparent 65%)',
              }}
            />
            <div
              aria-hidden
              className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent'
            />

            <div className='relative flex items-center justify-between'>
              <span className='inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] uppercase opacity-70'>
                <svg
                  aria-hidden
                  viewBox='0 0 24 24'
                  className='size-3.5 opacity-80'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21 12V7H5a2 2 0 0 1 0-4h14v4' />
                  <path d='M3 5v14a2 2 0 0 0 2 2h16v-5' />
                  <path d='M18 12a2 2 0 0 0 0 4h4v-4Z' />
                </svg>
                {t('Wallet balance')}
              </span>
              <span className='inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold ring-1 ring-white/15'>
                <span className='relative flex size-1.5'>
                  <span className='absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75' />
                  <span className='relative inline-flex size-1.5 rounded-full bg-emerald-400' />
                </span>
                {t('Live')}
              </span>
            </div>

            <div className='relative mt-4 flex items-end justify-between gap-4'>
              <div>
                <div className='bg-linear-to-b from-white to-white/70 bg-clip-text text-[44px] leading-none font-extrabold tracking-tight text-transparent'>
                  $12.40
                </div>
                <div className='mt-1.5 text-[13px] opacity-60'>
                  {t('remaining · no expiry')}
                </div>
              </div>
              <svg
                aria-hidden
                viewBox='0 0 120 40'
                className='mb-1 h-10 w-28 shrink-0'
                fill='none'
              >
                <defs>
                  <linearGradient id='hero-spark-fill' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='oklch(0.62 0.19 255)' stopOpacity='0.45' />
                    <stop offset='100%' stopColor='oklch(0.62 0.19 255)' stopOpacity='0' />
                  </linearGradient>
                </defs>
                <path
                  d='M0 32 C12 30 18 24 28 25 S46 33 56 28 74 12 84 14 104 8 120 4 L120 40 L0 40 Z'
                  fill='url(#hero-spark-fill)'
                />
                <path
                  d='M0 32 C12 30 18 24 28 25 S46 33 56 28 74 12 84 14 104 8 120 4'
                  stroke='oklch(0.72 0.17 255)'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
                <circle cx='120' cy='4' r='3' fill='oklch(0.72 0.17 255)' />
              </svg>
            </div>

            <div className='relative mt-5 flex flex-wrap gap-2'>
              <span className='rounded-full bg-white/5 px-3.5 py-1.5 text-[11px] font-medium ring-1 ring-white/15'>
                +$2
              </span>
              <span className='rounded-full bg-white/5 px-3.5 py-1.5 text-[11px] font-medium ring-1 ring-white/15'>
                +$5
              </span>
              <span className='bg-primary shadow-primary/40 rounded-full px-3.5 py-1.5 text-[11px] font-semibold shadow-lg ring-1 ring-white/25'>
                +$10
              </span>
              <span className='rounded-full bg-white/5 px-3.5 py-1.5 text-[11px] font-medium ring-1 ring-white/15'>
                +$20
              </span>
            </div>

            <div className='relative mt-6 grid grid-cols-3 divide-x divide-white/10 border-t border-white/15 pt-4 text-xs'>
              <div className='pr-3'>
                <div className='opacity-55'>{t('Spent today')}</div>
                <div className='mt-1 font-mono text-sm font-bold'>$0.011</div>
              </div>
              <div className='px-3'>
                <div className='opacity-55'>{t('Requests')}</div>
                <div className='mt-1 font-mono text-sm font-bold'>128</div>
              </div>
              <div className='pl-3'>
                <div className='opacity-55'>{t('Free models')}</div>
                <div className='mt-1 text-sm font-bold text-emerald-300'>
                  {t('Unlimited')}
                </div>
              </div>
            </div>
          </div>
          <div className='bg-background/90 border-border mt-4 inline-flex max-w-full items-center gap-2.5 rounded-xl border px-4 py-3 shadow-lg backdrop-blur md:absolute md:-bottom-5 md:-left-5 md:mt-0 md:whitespace-nowrap'>
            <span className='bg-primary/10 text-primary flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold'>
              $
            </span>
            <span className='text-xs font-semibold'>
              {t('Pay {{payable}} → {{credited}} credited', {
                payable: samplePayable,
                credited: `$${sampleAmount}`,
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
