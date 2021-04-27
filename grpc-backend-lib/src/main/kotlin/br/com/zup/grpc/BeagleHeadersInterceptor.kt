package br.com.zup.grpc

import io.grpc.Context
import io.grpc.Contexts
import io.grpc.Metadata
import io.grpc.ServerCall
import io.grpc.ServerCallHandler
import io.grpc.ServerInterceptor

open class BeagleHeadersInterceptor : ServerInterceptor {
    companion object {
        private const val HEADERS_KEY = "beagle-headers"
        val HEADERS_VALUE: Context.Key<Map<String, String>> = Context.key(HEADERS_KEY)
    }

    override fun <ReqT : Any?, RespT : Any?> interceptCall(
        call: ServerCall<ReqT, RespT>?,
        headers: Metadata?,
        next: ServerCallHandler<ReqT, RespT>?
    ): ServerCall.Listener<ReqT>? {
        var ctx = Context.current()
        ctx = ctx.withValue(HEADERS_VALUE, extractHeaders(headers))
        return Contexts.interceptCall(ctx, call, headers, next)
    }

    private fun extractHeaders(headers: Metadata?) = headers?.keys()!!.associateWith {
            headers.get(Metadata.Key.of(it, Metadata.ASCII_STRING_MARSHALLER)) as String
        }
}