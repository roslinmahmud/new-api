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

interface BannerProps {
  freeModelNames: string[]
}

export function Banner(props: BannerProps) {
  const { t } = useTranslation()

  if (props.freeModelNames.length === 0) {
    return null
  }

  const names = props.freeModelNames.slice(0, 3).join(' · ')

  return (
    <div className='bg-foreground text-background text-[13px]'>
      <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2.5 px-6 py-2'>
        <span
          aria-hidden
          className='size-[7px] shrink-0 rounded-full bg-emerald-400'
        />
        <span className='opacity-90'>
          {t('Always free: {{names}} — never draws from your balance', {
            names,
          })}
        </span>
        <a
          href='#models'
          className='text-primary font-semibold brightness-150 saturate-50'
        >
          {t('See models')} →
        </a>
      </div>
    </div>
  )
}
