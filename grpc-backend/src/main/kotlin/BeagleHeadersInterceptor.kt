import io.grpc.Context
import io.grpc.Contexts
import io.grpc.Metadata
import io.grpc.ServerCall
import io.grpc.ServerCallHandler
import io.grpc.ServerInterceptor
import java.util.logging.Logger

class HeadersRequestInterceptor : ServerInterceptor {
    companion object {
        private const val HEADERS_KEY = "beagle-headers"
        private val logger = Logger.getLogger(HeadersRequestInterceptor::class.java.name)
        val HEADERS_VALUE: Context.Key<Map<String, String>> = Context.key(HEADERS_KEY)
    }

    override fun <ReqT : Any?, RespT : Any?> interceptCall(
        call: ServerCall<ReqT, RespT>?,
        headers: Metadata?,
        next: ServerCallHandler<ReqT, RespT>?
    ): ServerCall.Listener<ReqT>? {
        var ctx = Context.current()
        logger.info("headers received from client:$headers")
        ctx = ctx.withValue(HEADERS_VALUE, extractHeaders(headers))
        return Contexts.interceptCall(ctx, call, headers, next)
    }

    private fun extractHeaders(headers: Metadata?): Map<String, String> {
        val headersMap = mutableMapOf<String, String>()
        headers?.keys()?.forEach { key ->
            headersMap[key] = headers.get(Metadata.Key.of(key, Metadata.ASCII_STRING_MARSHALLER)) as String
        }
        return headersMap
    }
}