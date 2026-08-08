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
import { useMemo } from 'react'

import { Footer } from '@/components/layout/components/footer'
import { usePricingData } from '@/features/pricing/hooks/use-pricing-data'

import { useCustomHomeInfo } from './hooks/use-custom-home-info'
import { isFreeModel, selectHomeModels } from './lib'
import { Banner } from './sections/banner'
import { Cta } from './sections/cta'
import { Faq } from './sections/faq'
import { Hero } from './sections/hero'
import { HowItWorks } from './sections/how-it-works'
import { Models } from './sections/models'
import { Stats } from './sections/stats'
import { TopupTiers } from './sections/topup-tiers'

interface CustomHomeProps {
  isAuthenticated: boolean
}

export function CustomHome(props: CustomHomeProps) {
  const { tiers, price } = useCustomHomeInfo()
  // Pricing module may be disabled (403); models sections degrade gracefully.
  const { models } = usePricingData()

  const freeModelNames = useMemo(
    () => models.filter(isFreeModel).map((model) => model.model_name),
    [models]
  )
  const homeModels = useMemo(() => selectHomeModels(models), [models])

  const minTier =
    tiers.length > 0
      ? tiers.reduce((min, tier) => (tier.amount < min.amount ? tier : min))
      : undefined

  return (
    <>
      <div className='pt-16'>
        <Banner freeModelNames={freeModelNames} />
      </div>
      <Hero
        isAuthenticated={props.isAuthenticated}
        price={price}
        sampleTierAmount={minTier?.amount}
      />
      <Stats price={price} freeModelCount={freeModelNames.length} />
      <TopupTiers
        isAuthenticated={props.isAuthenticated}
        tiers={tiers}
        price={price}
      />
      <HowItWorks />
      <Models models={homeModels} totalModelCount={models.length} />
      <Faq
        freeModelNames={freeModelNames}
        minTierAmount={minTier?.amount}
        minTierPayable={minTier?.payable}
      />
      <Cta
        isAuthenticated={props.isAuthenticated}
        hasFreeModels={freeModelNames.length > 0}
      />
      <Footer />
    </>
  )
}
