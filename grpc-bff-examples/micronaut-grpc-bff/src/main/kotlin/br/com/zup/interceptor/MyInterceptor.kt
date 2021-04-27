package br.com.zup.interceptor

import br.com.zup.grpc.BeagleHeadersInterceptor
import io.micronaut.core.order.Ordered
import javax.inject.Singleton

@Singleton
class MyInterceptor: BeagleHeadersInterceptor(), Ordered {

    @Override
    override fun getOrder() = 10
}