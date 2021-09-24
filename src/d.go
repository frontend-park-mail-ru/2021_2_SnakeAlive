package main

import (
	"fmt"
	"net/http"
	"reflect"

	"github.com/fasthttp/router"
	"github.com/valyala/fasthttp"
)

func main() {
	rtr := router.New()
	rtr.Handle(http.MethodPost, "/login", func(ctx *fasthttp.RequestCtx) {
		fmt.Println(string(ctx.Request.Body()))
		ctx.SetBody(ctx.Request.Body())
	})

	srv := &fasthttp.Server{
		Handler: Cors(rtr.Handler),
	}

	err := srv.ListenAndServe(fmt.Sprintf(":%d", 9030))
	if err != nil {
		if err != http.ErrServerClosed {
			fmt.Println(err)
		}
		return
	}

	defer srv.Shutdown()
}

func Cors(handler fasthttp.RequestHandler) fasthttp.RequestHandler {
	return func(ctx *fasthttp.RequestCtx) {
		ctx.Response.Header.Set(fasthttp.HeaderAccessControlAllowOrigin, "*")
		ctx.Response.Header.Set(fasthttp.HeaderContentType, "application/json; charset=utf-8")
		ctx.Response.Header.Set(fasthttp.HeaderAccessControlAllowMethods, "GET, POST, PATCH, PUT, DELETE, OPTIONS")
		ctx.Response.Header.Set(fasthttp.HeaderAccessControlAllowHeaders, "Origin, Content-Type, Authorization, Request-ID")
		ctx.Response.Header.Set(fasthttp.HeaderAccessControlExposeHeaders, "Authorization")
		ctx.Response.Header.Set(fasthttp.HeaderAccessControlMaxAge, "3600")
		ctx.Response.Header.Set(fasthttp.HeaderAccessControlAllowCredentials, "true")

		if reflect.DeepEqual(ctx.Request.Header.Method(), []byte(fasthttp.MethodOptions)) {
			ctx.Response.SetStatusCode(fasthttp.StatusOK)
			return
		}

		handler(ctx)
	}
}
