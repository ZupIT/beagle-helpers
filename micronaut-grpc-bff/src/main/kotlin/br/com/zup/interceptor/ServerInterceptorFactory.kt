package br.com.zup.interceptor

import io.grpc.ServerInterceptor
import io.micronaut.context.annotation.Bean
import io.micronaut.context.annotation.Factory
import io.micronaut.grpc.server.interceptor.OrderedServerInterceptor
import javax.inject.Singleton

@Factory
class ServerInterceptorFactory {
    @Bean
    @Singleton
    fun mySeverInterceptor(): ServerInterceptor {
        return  OrderedServerInterceptor ( MyInterceptor(), 10 )
    }
}