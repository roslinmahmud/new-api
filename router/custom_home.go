package router

// CUSTOM EXTENSION: Routes for the custom homepage.

import (
	"github.com/QuantumNous/new-api/controller"

	"github.com/gin-gonic/gin"
)

func RegisterCustomHomeRoutes(apiRouter *gin.RouterGroup) {
	apiRouter.GET("/custom/home_info", controller.GetCustomHomeInfo)
}
