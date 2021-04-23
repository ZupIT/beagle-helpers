package br.com.zup.interceptors

import BeagleHeadersInterceptor
import io.grpc.ServerInterceptor
import io.micronaut.context.annotation.Bean
import io.micronaut.context.annotation.Factory
import io.micronaut.grpc.server.interceptor.OrderedServerInterceptor
import javax.inject.Singleton


//@Factory
//class ServerInterceptorFactory {
//    @Bean
//    @Singleton
//    fun beagleHeadersInterceptor(): ServerInterceptor {
//        return OrderedServerInterceptor(BeagleHeadersInterceptor(), 10)
//    }
//}