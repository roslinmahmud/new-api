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
import type { PricingModel } from '@/features/pricing/types'

/** Maximum number of models rendered on the homepage grid. */
export const HOME_MODELS_LIMIT = 9

/**
 * A model is free when its billing never draws from the wallet:
 * token-based with a zero ratio, or per-request with a zero price.
 * Models with dynamic billing expressions are never considered free.
 */
export function isFreeModel(model: PricingModel): boolean {
  if (model.billing_expr) return false
  if (model.quota_type === 1) return !model.model_price
  return model.model_ratio === 0
}

/** Free models first, then alphabetical, capped for the homepage grid. */
export function selectHomeModels(models: PricingModel[]): PricingModel[] {
  return [...models]
    .sort((a, b) => {
      const freeDiff = Number(isFreeModel(b)) - Number(isFreeModel(a))
      if (freeDiff !== 0) return freeDiff
      return a.model_name.localeCompare(b.model_name)
    })
    .slice(0, HOME_MODELS_LIMIT)
}
