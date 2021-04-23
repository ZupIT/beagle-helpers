package br.com.zup.service

import BeagleHeadersInterceptor
import BeagleScreenService
import br.com.zup.beagle.widget.layout.ScreenBuilder
import net.devh.boot.grpc.server.service.GrpcService
import br.com.zup.grpcbff.screen.ButtonScreen
import br.com.zup.grpcbff.screen.TextScreen

@GrpcService(interceptors = [BeagleHeadersInterceptor::class] )
class MyBeagleAppService(
    screens: Map<String, ScreenBuilder> = mapOf(
        "button" to ButtonScreen,
        "text" to TextScreen
    )
): BeagleScreenService(screens)