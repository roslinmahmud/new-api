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

export function HowItWorks() {
  const { t } = useTranslation()

  const steps = [
    {
      title: t('Top up your wallet'),
      body: t(
        'Pick a preset amount and pay with any available method. Credit lands instantly.'
      ),
    },
    {
      title: t('Generate one API key'),
      body: t('The same key works in Claude Code, your IDE and the CLI.'),
    },
    {
      title: t('Balance draws down as you go'),
      body: t(
        'Priced per token, billed per request. Free models never touch your balance.'
      ),
    },
  ]

  return (
    <section className='mx-auto max-w-6xl px-6 py-12 md:py-20'>
      <span className='text-primary mb-2.5 block text-xs font-semibold tracking-[0.12em] uppercase'>
        {t('How it works')}
      </span>
      <h2 className='mb-8 text-[clamp(1.625rem,3.2vw,2.5rem)] leading-tight font-bold tracking-tight'>
        {t('Three steps, no billing cycle')}
      </h2>
      <div className='grid gap-8 md:grid-cols-3 md:gap-10'>
        {steps.map((step, index) => (
          <div key={step.title}>
            <div className='mb-3 flex items-center gap-3'>
              <span className='bg-primary text-primary-foreground flex size-8.5 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold'>
                {index + 1}
              </span>
              {index < steps.length - 1 && (
                <span className='from-primary/25 h-0.5 flex-1 bg-gradient-to-r to-transparent' />
              )}
            </div>
            <div className='mb-1.5 text-lg font-bold'>{step.title}</div>
            <p className='text-muted-foreground text-[14.5px] leading-relaxed'>
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
