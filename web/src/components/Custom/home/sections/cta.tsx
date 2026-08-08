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

interface CtaProps {
  isAuthenticated: boolean
  hasFreeModels: boolean
}

export function Cta(props: CtaProps) {
  const { t } = useTranslation()

  return (
    <section className='mx-auto max-w-6xl px-6 pb-12 md:pb-16'>
      <div className='from-primary relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-br to-blue-900 p-7 text-white shadow-2xl md:p-12'>
        <div
          aria-hidden
          className='absolute -right-16 -bottom-20 size-70 rounded-full bg-white/10'
        />
        <div className='relative'>
          <div className='text-[clamp(1.5rem,3.2vw,2.375rem)] leading-tight font-extrabold tracking-tight'>
            {t('Ready to top up?')}
          </div>
          <p className='mt-2.5 max-w-[44ch] text-[15px] opacity-85'>
            {props.hasFreeModels
              ? t(
                  'Start with the free models, then add funds only when you need a bigger one.'
                )
              : t('Add funds and pay only for what you actually use.')}
          </p>
        </div>
        <Link
          to={props.isAuthenticated ? '/dashboard' : '/sign-up'}
          className='text-primary relative rounded-full bg-white px-6.5 py-3.5 text-[15px] font-bold transition hover:bg-blue-50'
        >
          {props.isAuthenticated ? t('Go to dashboard') : t('Get started')}
        </Link>
      </div>
    </section>
  )
}
