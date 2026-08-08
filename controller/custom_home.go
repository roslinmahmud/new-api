package controller

// CUSTOM EXTENSION: Public homepage info endpoint for the custom landing page.
// Exposes only non-sensitive top-up preset data so anonymous visitors can see
// live wallet top-up tiers. User-specific and gateway-specific details remain
// behind the authenticated /api/user/topup/info endpoint.

import (
	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/setting/operation_setting"

	"github.com/gin-gonic/gin"
)

func GetCustomHomeInfo(c *gin.Context) {
	paymentSetting := operation_setting.GetPaymentSetting()
	common.ApiSuccess(c, gin.H{
		"amount_options":  paymentSetting.AmountOptions,
		"amount_discount": paymentSetting.AmountDiscount,
		"min_topup":       operation_setting.MinTopUp,
		"price":           operation_setting.Price,
	})
}
