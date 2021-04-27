package br.com.zup.service

import br.com.zup.beagle.widget.layout.ScreenBuilder
import br.com.zup.grpc.BeagleScreenService
import br.com.zup.grpcbff.screen.ButtonScreen
import br.com.zup.grpcbff.screen.TextScreen
import javax.inject.Singleton

@Singleton
@Suppress("unused")
class MyBeagleAppService: BeagleScreenService() {
    override fun screens(): Map<String, ScreenBuilder> {
        return mapOf(
            "text" to TextScreen,
            "button" to ButtonScreen
        )
    }
}