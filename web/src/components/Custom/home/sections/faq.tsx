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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { formatLocalCurrencyAmount } from '@/lib/currency'

interface FaqProps {
  freeModelNames: string[]
  minTierAmount?: number
  minTierPayable?: number
}

export function Faq(props: FaqProps) {
  const { t } = useTranslation()

  const items: { question: string; answer: string }[] = [
    {
      question: t('Does my balance expire?'),
      answer: t(
        'No. What you top up stays in your wallet until you spend it — no monthly reset, no expiry date.'
      ),
    },
    {
      question: t('Is there a session or weekly limit?'),
      answer: t(
        "No. This isn't a subscription tier — the only limit is how much balance is left in your wallet."
      ),
    },
    {
      question: t('How am I billed for each request?'),
      answer: t(
        'Every request deducts its exact token cost from your balance — input and output tokens are priced separately for each model, so you only ever pay for what you actually use.'
      ),
    },
  ]

  if (props.freeModelNames.length > 0) {
    items.push({
      question: t('Which models are free?'),
      answer: t(
        'Currently free: {{names}}. These models never draw from your balance.',
        { names: props.freeModelNames.join(', ') }
      ),
    })
  }

  if (props.minTierAmount && props.minTierPayable) {
    items.push({
      question: t('Can I top up a small amount?'),
      answer: t(
        'Yes — {{payable}} adds {{credited}}, enough to try a paid model before committing to a larger top-up.',
        {
          payable: formatLocalCurrencyAmount(props.minTierPayable),
          credited: `$${props.minTierAmount}`,
        }
      ),
    })
  }

  return (
    <section id='faq' className='relative mx-auto max-w-6xl px-6 py-12 md:py-20'>
      <div className='grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16'>
        {/* Left: sticky intro */}
        <div className='lg:sticky lg:top-28 lg:self-start'>
          <span className='text-primary mb-2.5 block text-xs font-semibold tracking-[0.12em] uppercase'>
            {t('FAQ')}
          </span>
          <h2 className='text-[clamp(1.625rem,3.2vw,2.5rem)] leading-tight font-bold tracking-tight'>
            {t('Common questions')}
          </h2>
          <p className='text-muted-foreground mt-3.5 max-w-[40ch] text-[15px] leading-relaxed'>
            {t(
              'Everything about the wallet, top-ups and free models — answered.'
            )}
          </p>
          <div className='border-border bg-muted/40 mt-7 hidden items-center gap-3.5 rounded-2xl border p-4 lg:flex'>
            <span className='bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-xl'>
              <svg
                aria-hidden
                viewBox='0 0 24 24'
                className='size-4.5'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='12' cy='12' r='10' />
                <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
                <path d='M12 17h.01' />
              </svg>
            </span>
            <div className='text-sm'>
              <div className='font-semibold'>{t('Still have questions?')}</div>
              <Link
                to='/pricing'
                className='text-primary text-[13px] font-medium hover:underline'
              >
                {t('View all pricing')} →
              </Link>
            </div>
          </div>
        </div>

        {/* Right: accordion */}
        <Accordion
          defaultValue={[items[0].question]}
          className='border-border bg-background divide-border divide-y rounded-2xl border px-5 shadow-xs md:px-6'
        >
          {items.map((item) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className='border-0 py-1.5'
            >
              <AccordionTrigger className='py-4 text-[15px] font-semibold hover:no-underline'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground pb-4 text-sm leading-relaxed'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
